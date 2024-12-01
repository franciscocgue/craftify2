import { PutObjectCommand, GetObjectCommand, S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const contentTypes = {
    'js': 'application/javascript',
    'css': 'text/css',
    'html': 'text/html',
};

type putObjectServiceProps = {
    bucketName: string,
    key: string,
    body: any
};

const putObjectService = async ({ bucketName, key, body }: putObjectServiceProps) => {

    const s3Client = new S3Client({});

    // Put an object into an Amazon S3 bucket.
    await s3Client.send(
        new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: body,
        }),
    );

    // Read the object.
    // const { Body } = await s3Client.send(
    //     new GetObjectCommand({
    //         Bucket: bucketName,
    //         Key: `${appId}/index.html`,
    //     }),
    // );

    // console.log(await Body?.transformToString());
}


type getObjectServiceProps = {
    bucketName: string,
    key: string,
};

const getObjectService = async ({ bucketName, key }: getObjectServiceProps) => {

    const s3Client = new S3Client({});

    // Read the object.
    const { Body } = await s3Client.send(
        new GetObjectCommand({
            Bucket: bucketName,
            Key: key,
        }),
    );

    if (Body) {
        const bodyString = await Body.transformToString();
        return bodyString;
    } else {
        return null;
    }
    // console.log(await Body?.transformToString());
}

const presignedUrlService = async ({ bucketName, key }: { bucketName: string, key: string }) => {
    const ext = key.split('.').at(-1) || 'no-ext';
    const client = new S3Client({});
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
        ResponseContentType: contentTypes[ext as keyof typeof contentTypes],
    });
    const url = await getSignedUrl(client, command, { expiresIn: 60 * 60 });

    return url;
}

const deleteObjectService = async ({ bucketName, key }: { bucketName: string, key: string }) => {

    const s3Client = new S3Client({});
    const data = await s3Client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }));

    return data;
};

export {
    putObjectService,
    getObjectService,
    deleteObjectService,
    presignedUrlService,
}