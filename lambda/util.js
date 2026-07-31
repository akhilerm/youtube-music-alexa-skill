const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3SigV4Client = new S3Client({
    region: process.env.S3_PERSISTENCE_REGION
});

module.exports.getS3PreSignedUrl = async function getS3PreSignedUrl(s3ObjectKey) {

    const bucketName = process.env.S3_PERSISTENCE_BUCKET;
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: s3ObjectKey
    });
    const s3PreSignedUrl = await getSignedUrl(s3SigV4Client, command, {
        expiresIn: 60 // the expiration is capped at 1 minute
    });
    console.log(`Util.s3PreSignedUrl: ${s3ObjectKey} URL ${s3PreSignedUrl}`);
    return s3PreSignedUrl;

}
