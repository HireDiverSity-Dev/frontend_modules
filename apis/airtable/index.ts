import axios from 'axios';

const mainUrl = 'https://api.hirevisa.com/api/airtable';

const airtable = axios.create({
  baseURL: mainUrl,
  validateStatus: (status) => {
    return status < 300;
  },
});

export default airtable;
