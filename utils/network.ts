import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import axios, { AxiosError } from 'axios';
import jwt_decode from 'jwt-decode';

const mainUrl = 'https://api.hirevisa.com/';
const testUrl = 'http://3.37.118.246:8585/';

export const client = axios.create({
  baseURL: mainUrl,
  validateStatus: (status) => {
    return status < 500;
  },
});

interface Token {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

//token 설정
client.interceptors.request.use(
  async function (config) {
    //브라우저 요청일 시
    if (typeof document !== 'undefined') {
      const storage = localStorage.getItem('auth');
      if (storage) {
        const auth = JSON.parse(storage);
        let accessToken = auth?.accessToken;
        if (accessToken) {
          const decodedAccessToken = jwt_decode<Token>(accessToken);
          if (Date.now() >= decodedAccessToken.exp * 1000) {
            console.log('AccessToken expired');
            const res = await axios.post(`${mainUrl}user/refreshToken`, auth);
            if (res.status === 200) {
              localStorage.setItem('auth', JSON.stringify({ ...auth, ...res.data }));
              accessToken = res.data.accessToken;
            } else {
              console.log('logout');
              localStorage.removeItem('auth');
              location.reload();
            }
          }
          config.headers.set('access_token', accessToken);
        }
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.status) {
      const status = error?.response?.status;
      if (status && status < 500) {
        console.log(error.response);
        return error.response;
      }
    }
    return Promise.reject(error);
  },
);

export const airtable = axios.create({
  baseURL: '/api/airtable',
  validateStatus: (status) => {
    return status < 300;
  },
});

export const s3 = axios.create({
  baseURL: '/api/s3',
  validateStatus: (status) => {
    return status < 300;
  },
});

export const lambda = axios.create({
  baseURL: 'https://sdiazawpj5.execute-api.ap-northeast-2.amazonaws.com/',
  validateStatus: (status) => {
    return status < 500;
  },
});
