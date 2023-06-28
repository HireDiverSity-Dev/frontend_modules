import axios from 'axios';

const mainUrl = 'https://api.hirevisa.com/api/s3';

const s3 = axios.create({
  baseURL: mainUrl,
  validateStatus: (status) => {
    return status < 300;
  },
});

export default s3;
