import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { S3Client } from '@aws-sdk/client-s3';
import axios from 'axios';
import { clientSetToken } from 'fe-modules/apis/token';

const adminUrl = 'https://admin.api.hirevisa.com/';
const clientUrl = 'https://api.hirevisa.com/';
const airtableUrl = 'https://api.hirevisa.com/api/airtable';
const lambdaUrl = 'https://sdiazawpj5.execute-api.ap-northeast-2.amazonaws.com';

let dynamoDBClient: DynamoDBClient;
let s3Client: S3Client;

const admin = axios.create({
  baseURL: adminUrl,
  validateStatus: (status) => {
    return status < 500;
  },
});

const client = axios.create({
  baseURL: clientUrl,
  validateStatus: (status) => {
    return status < 500;
  },
});
clientSetToken(client);

const airtable = axios.create({
  baseURL: airtableUrl,
  validateStatus: (status) => {
    return status < 300;
  },
});

const lambda = axios.create({
  baseURL: lambdaUrl,
  validateStatus: (status) => {
    return status < 500;
  },
});

const getS3Client = () => {
  if (!s3Client) {
    s3Client = new S3Client({
      region: process.env.REGION,
      credentials: { accessKeyId: process.env.ACCESS_KEY_ID!, secretAccessKey: process.env.SECRET_ACCESS_KEY! },
    });
  }
};

const getDynamoDBClient = () => {
  if (!dynamoDBClient) {
    dynamoDBClient = new DynamoDBClient({
      region: process.env.REGION,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!,
      },
    });
  }

  return dynamoDBClient;
};

export { admin, airtable, client, getDynamoDBClient, getS3Client, lambda };
