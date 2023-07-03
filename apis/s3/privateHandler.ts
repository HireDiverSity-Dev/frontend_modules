import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getS3Client } from 'fe-modules/apis/network';

export default async function privateHandler(key: any, type: any) {
  const s3Client = getS3Client();
  const s3Params = {
    Bucket: process.env.S3_BUCKET_PRIVATE,
    Key: key,
    ContentType: type,
  };

  const command = new PutObjectCommand(s3Params);
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  return signedUrl;
}
