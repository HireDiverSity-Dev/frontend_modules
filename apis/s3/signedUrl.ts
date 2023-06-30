import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { NextApiRequest, NextApiResponse } from 'next';

// Set the AWS Region.
const REGION = 'ap-northeast-2';

const s3Client = new S3Client({
  region: REGION,
  credentials: { accessKeyId: process.env.ACCESS_KEY_ID!, secretAccessKey: process.env.SECRET_ACCESS_KEY! },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const { name, type } = req.body;
  const s3Params = {
    Bucket: process.env.S3_BUCKET_PRIVATE,
    Key: name,
    ContentType: type,
    // ACL: 'bucket-owner-full-control'
  };

  const command = new PutObjectCommand(s3Params);

  try {
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    //console.log(signedUrl);
    return res.status(201).send(signedUrl);
  } catch (err) {
    console.error(err);
  }
}
