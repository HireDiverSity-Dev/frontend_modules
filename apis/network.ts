import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { S3Client } from '@aws-sdk/client-s3';
import axios from 'axios';
import { clientSetToken } from 'fe-modules/apis/token';

const adminUrl = 'https://admin.api.hirevisa.com/';
const clientUrl = 'https://api.hirevisa.com/';
const airtableUrl = 'https://api.hirevisa.com/api/airtable';
const lambdaUrl = 'https://sdiazawpj5.execute-api.ap-northeast-2.amazonaws.com';
const awsUrl = 'https://main.ds23a3oqfeslh.amplifyapp.com/api';
const testUrl = 'http://localhost:3009/api';

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

const aws = axios.create({
  baseURL: awsUrl,
  validateStatus: (status) => {
    return status < 400;
  },
});

export { admin, airtable, aws, client, lambda };
