import axios from "axios";
import { clientSetToken } from "fe-modules/apis/token";

const adminUrl = "https://admin.api.hirevisa.com";
const clientUrl = "https://api.hirevisa.com";
const lambdaUrl =
  "https://sdiazawpj5.execute-api.ap-northeast-2.amazonaws.com/v1";
const awsUrl = "https://aws.hirevisa.com/api";
const djangoUrl = "https://py.hirevisa.com";

const api2Url = "https://api2.hirevisa.com";
// const testUrl = 'http://localhost:3009/api';

const crawlerUrl = "http://52.79.233.127:53001/api";

const admin = axios.create({
  baseURL: adminUrl,
  validateStatus: (status) => {
    return status < 500;
  },
});

const clientRefresh = axios.create({
  baseURL: clientUrl,
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

const api2 = axios.create({
  baseURL: api2Url,
  validateStatus: (status) => {
    return status < 500;
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

const django = axios.create({
  baseURL: djangoUrl,
  validateStatus: (status) => {
    return status < 400;
  },
});

const crawler = axios.create({
  baseURL: crawlerUrl,
  validateStatus: (status) => {
    return status < 400;
  },
});

export { admin, aws, client, clientRefresh, crawler, django, lambda, api2 };
