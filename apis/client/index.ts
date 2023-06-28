import { getAccessToken } from 'fe-modules/apis/client/token';
import { mainUrl } from 'fe-modules/apis/client/url';
import axios, { AxiosError } from 'axios';

const client = axios.create({
  baseURL: mainUrl,
  validateStatus: (status) => {
    return status < 500;
  },
});

client.interceptors.request.use(
  async function (config) {
    if (typeof document !== 'undefined') {
      const accessToken = await getAccessToken();
      config.headers.set('access_token', accessToken);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
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

export default client;
