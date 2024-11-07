import { Worker } from 'bullmq';
import { QUEUE_NAMES, redisConnection } from '../config';
import { buildLogger } from '../../../../common-utils/logger';
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

    const appId = job.data['app-id'];
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

    console.log(stdout)

    if (stderr) {
        // catched on 'failed' worker event
        throw new Error(stderr);
    }
    // console.log(`stdout: ${stdout}`);


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