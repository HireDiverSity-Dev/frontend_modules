import axios from 'axios';
import { clientSetToken } from 'fe-modules/apis/token';

const adminUrl = 'https://admin.api.hirevisa.com';
const clientUrl = 'https://api.hirevisa.com';
const lambdaUrl = 'https://sdiazawpj5.execute-api.ap-northeast-2.amazonaws.com/v1';
const awsUrl = '//aws.hirevisa.com/api';
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

export { admin, aws, client, lambda };
