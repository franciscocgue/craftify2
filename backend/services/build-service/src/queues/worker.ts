import { Worker } from 'bullmq';
import { QUEUE_NAMES, redisConnection } from '../config';
import { buildLogger } from '../utils/logger';
import { httpClient } from '../utils/http-client';
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

const logger = buildLogger('build-service');

// Promisify the exec function
const execPromise = util.promisify(exec);

type BuildParamsType = {
    'app-id': string,
    components: any,
    properties: any,
    variables: any,
    logicNodes: any,
    logicEdges: any,
}

const worker = new Worker<BuildParamsType>(QUEUE_NAMES.appBuilder, async job => {

    let appId: string;
    if (process.env.NODE_ENV === 'production') {
        // in prod, user-app preview served from S3 bucket
        appId = job.data['app-id'];
    } else {
        // in dev, user-app preview is served locally
        appId = 'development'
    }
    const userAppPath = path.join(__dirname, '..', '..', '..', '..', 'user-app', 'src', 'app-data', appId);

    // create any necessary directories
    fs.mkdirSync(userAppPath, { recursive: true });

    // write json files in user-app
    fs.writeFileSync(path.join(userAppPath, 'components.json'), JSON.stringify(job.data?.components ?? {}))
    fs.writeFileSync(path.join(userAppPath, 'properties.json'), JSON.stringify(job.data?.properties ?? {}))
    fs.writeFileSync(path.join(userAppPath, 'variables.json'), JSON.stringify(job.data?.variables ?? {}))
    fs.writeFileSync(path.join(userAppPath, 'logicNodes.json'), JSON.stringify(job.data?.logicNodes ?? {}))
    fs.writeFileSync(path.join(userAppPath, 'logicEdges.json'), JSON.stringify(job.data?.logicEdges ?? {}))

    // run npm script (with output directly being based in project uuid)


    // cross-env USER_APP_ID=12345 npm run build --prefix ../../user-app -- --outDir ./dist/12345

    // -- --param --> means param is not for npm run but for the actual command (here: vite build)
    // const appBuildScript = `cross-env USER_APP_ID=${appId} npm run build --prefix ../../user-app -- --outDir dist/${appId}`
    const appBuildScript = `cross-env USER_APP_ID=${appId} npm run build --prefix ../../user-app`
    // Await the exec function to ensure it completes
    const { stdout, stderr } = await execPromise(appBuildScript);

    // console.log(stdout)

    if (stderr) {
        // catched on 'failed' worker event
        throw new Error(stderr);
    }

    // if production, get pre-signed urls for AWS S3
    // and update in built files

    // if in production: upload to S3 bucket and get presigned URLs
    if (process.env.NODE_ENV === 'production') {

        // get pre-signed urls

        type ObjType = {
            bucketName: string,
            key: string,
        }
        const { data: presignedUrls } = await httpClient.post<ObjType[], Record<`${string}/index.html` | `${string}/assets/index.js` | `${string}/assets/style.css`, string>>(
            'http://localhost:3002/api/aws-service/s3/presignedUrl',
            [
                {
                    'bucketName': 'craftify-app-previews',
                    'key': `${appId}/assets/style.css`
                },
                {
                    'bucketName': 'craftify-app-previews',
                    'key': `${appId}/assets/index.js`
                },
                {
                    'bucketName': 'craftify-app-previews',
                    'key': `${appId}/index.html`
                },
            ]
        );

        // replace asset paths in index.html built

        const htmlFilePath = path.join(__dirname, '..', '..', '..', '..', 'user-app', 'dist', appId, 'index.html');
        let htmlFileContent: string = fs.readFileSync(htmlFilePath, 'utf8');
        // assumed 2 assets: js and css
        htmlFileContent = htmlFileContent.replace('/assets/index.js', presignedUrls[`${appId}/assets/index.js`])
        htmlFileContent = htmlFileContent.replace('/assets/style.css', presignedUrls[`${appId}/assets/style.css`])

        // upload to S3 bucket

        const assetsPath = path.join(__dirname, '..', '..', '..', '..', 'user-app', 'dist', appId, 'assets');
        const jsContent: string = fs.readFileSync(path.join(assetsPath, 'index.js'), 'utf8');
        const cssContent: string = fs.readFileSync(path.join(assetsPath, 'style.css'), 'utf8');

        await httpClient.post(
            'http://localhost:3002/api/aws-service/s3/putObject',
            {
                'app-id': '123e3e35-425a-4c33-a813-83dde0d03576',
                'objects': [
                    {
                        'bucketName': 'craftify-app-previews',
                        'key': `${appId}/index.html`,
                        'body': htmlFileContent
                    },
                    {
                        'bucketName': 'craftify-app-previews',
                        'key': `${appId}/assets/index.js`,
                        'body': jsContent
                    },
                    {
                        'bucketName': 'craftify-app-previews',
                        'key': `${appId}/assets/style.css`,
                        'body': cssContent
                    },
                ]
            }
        )

        // index.html URL
        console.log(presignedUrls[`${appId}/index.html`]);
    } else {
        // index.html URL
        console.log('http://localhost:3000/preview-dev');
    }

    // read dist files and write to aws

    // get the presigned urls and return to client (on worker job done)

    // web sockets

}, { connection: redisConnection });

worker.on('completed', job => {
    logger.log(`Job ${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    logger.error(`Job ${job?.id} has failed with ${err.message}`);
});