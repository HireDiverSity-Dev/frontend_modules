import axios from 'axios';

const mainUrl = 'https://sdiazawpj5.execute-api.ap-northeast-2.amazonaws.com';

export const lambda = axios.create({
  baseURL: mainUrl,
  validateStatus: (status) => {
    return status < 500;
  },
});
