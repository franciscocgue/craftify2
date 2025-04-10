import { Worker } from 'bullmq';
import { QUEUE_NAMES, redisConnection } from '../config';
import { buildLogger } from '../utils/logger';
import { httpClient } from '../utils/http-client';
import * as fs from 'fs';
import * as path from 'path';
const { exec } = require('child_process');
const util = require('util');

const logger = buildLogger('build-service');

// utils for cleanup
const rmFolder = (dir: string) => {
    fs.rm(dir, { recursive: true, force: true }, err => {
        if (err) {
            logger.error(`Error when deleting '${dir}'`);
        }
    });
};
const cleanUp = (dirs: string[]) => {
    dirs.forEach(dir => rmFolder(dir));
};

// Promisify the exec function
const execPromise = util.promisify(exec);

type BuildParamsType = {
    'app-id': string,
    components: any,
    properties: any,
    variables: any,
    logicNodes: any,
    logicEdges: any,
    sessionToken: string,
}

const apiUrlAws = process.env.API_URL_AWS;
const apiUrlWeb = process.env.API_URL_WEB;
const apiUrlDb = process.env.API_URL_DB;

const worker = new Worker<BuildParamsType>(QUEUE_NAMES.appBuilder, async job => {

    const devRef = 'development'; // in development, build to dist/development and app-data/development
    const appId: string = job.data['app-id'];
    const userAppPath = path.join(
        __dirname,
        '..', '..', '..', '..',
        'user-app', 'src', 'app-data',
        process.env.NODE_ENV === 'production' ? appId : devRef);

    // create any necessary directories
    fs.mkdirSync(userAppPath, { recursive: true });

    // write json files in user-app
    fs.writeFileSync(path.join(userAppPath, 'components.json'), JSON.stringify(job.data?.components ?? {}))
    fs.writeFileSync(path.join(userAppPath, 'properties.json'), JSON.stringify(job.data?.properties ?? {}))
    fs.writeFileSync(path.join(userAppPath, 'variables.json'), JSON.stringify(job.data?.variables ?? {}))
    fs.writeFileSync(path.join(userAppPath, 'logicNodes.json'), JSON.stringify(job.data?.logicNodes ?? {}))
    fs.writeFileSync(path.join(userAppPath, 'logicEdges.json'), JSON.stringify(job.data?.logicEdges ?? {}))

    // run npm script (with output directly being based on project uuid)


    // -- --param --> means param is not for npm run but for the actual command (here: vite build)
    // const appBuildScript = `cross-env USER_APP_ID=${appId} npm run build --prefix ../../user-app -- --outDir dist/${appId}`
    const appBuildScript = `cross-env USER_APP_ID=${process.env.NODE_ENV === 'production' ? appId : devRef} npm run build --prefix ../../user-app`
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
    let previewUrl: string;
    if (process.env.NODE_ENV === 'production') {

        // get pre-signed urls

        type ObjType = {
            bucketName: string,
            key: string,
        }
        const presignedUrls = await httpClient.post<
            Record<`${string}/index.html` | `${string}/assets/index.js` | `${string}/assets/style.css`, string>, ObjType[]>(
                `${apiUrlAws}/api/aws-service/s3/presignedUrl`,
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

        await httpClient.post<{}, { objects: (ObjType & { body: string })[] }>(
            `${apiUrlAws}/api/aws-service/s3/putObject`,
            {
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
        );

        // save JSON objects asynchronously
        httpClient.post<{}, { objects: (ObjType & { body: string })[] }>(
            `${apiUrlAws}/api/aws-service/s3/putObject`,
            {
                'objects': [
                    {
                        'bucketName': 'craftify-app-previews',
                        'key': `${appId}/build-resources/components.json`,
                        'body': JSON.stringify(job.data?.components ?? {})
                    },
                    {
                        'bucketName': 'craftify-app-previews',
                        'key': `${appId}/build-resources/properties.json`,
                        'body': JSON.stringify(job.data?.properties ?? {})
                    },
                    {
                        'bucketName': 'craftify-app-previews',
                        'key': `${appId}/build-resources/variables.json`,
                        'body': JSON.stringify(job.data?.variables ?? {})
                    },
                    {
                        'bucketName': 'craftify-app-previews',
                        'key': `${appId}/build-resources/logicNodes.json`,
                        'body': JSON.stringify(job.data?.logicNodes ?? {})
                    },
                    {
                        'bucketName': 'craftify-app-previews',
                        'key': `${appId}/build-resources/logicEdges.json`,
                        'body': JSON.stringify(job.data?.logicEdges ?? {})
                    },
                ]
            }
        );
        // update modified date of project
        httpClient.post(`${apiUrlDb}/api/db-service/update`, {
            collectionName: 'projects',
            filter: { appId: appId },
            changes: { editedOn: new Date() },
        });

        // index.html URL
        previewUrl = presignedUrls[`${appId}/index.html`];
    } else {
        // index.html URL
        previewUrl = `${apiUrlWeb}/preview-dev`;
    }

    // async clean-up
    const dirs = [
        // input object files for the build in user-app (app-data)
        userAppPath,
    ];
    if (process.env.NODE_ENV === 'production') {
        // dist user-app folder; 
        // in dev we keep local folder for serving purposes
        dirs.push(path.join(__dirname, '..', '..', '..', '..', 'user-app', 'dist', appId));
    }
    cleanUp(dirs);

    return previewUrl;

}, { connection: redisConnection });

worker.on('completed', async (job, returnvalue) => {
    // notify client

    const appId = job.data['app-id'];
    const previewUrl = returnvalue;

    const data = { url: previewUrl, error: null };
    try {
        logger.log(`apiUrlWeb: ${apiUrlWeb}`)
        await httpClient.post<{}, { clientId: string, data: any }>(
            `${apiUrlWeb}/api/web-service/broadcast`,
            { clientId: appId, data },
            {
                headers: {
                    Cookie: `session=${job.data.sessionToken}`,
                },
            });
    } catch (error) {
        logger.error(`Error when notifying client ${appId} on success completion of Job ${job.id}`);
    }

    logger.log(`Job ${job.id} has completed!`);
});

worker.on('failed', async (job, err) => {
    // notify client

    if (job) {
        const appId = job.data['app-id'];
        // @TODO FUTURE: throw more generic friendlier error?
        const data = { error: err.message, code: 500 };

        try {
            await httpClient.post<{}, { clientId: string, data: any }>(
                `${apiUrlWeb}/api/web-service/broadcast`,
                { clientId: appId, data },
                {
                    headers: {
                        Cookie: `session=${job.data.sessionToken}`,
                    },
                });
        } catch (error) {
            logger.error(`Error when notifying client ${appId} on failure of Job ${job.id}`);
        }

    }

    logger.error(`Job ${job?.id} has failed with ${err.message}`);
});