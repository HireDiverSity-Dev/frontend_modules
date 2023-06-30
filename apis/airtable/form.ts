import { airtable } from '../network';

const postFormToAirtable = async (sendData: string) => {
  const res = airtable.post('/form/submit', sendData);
  return res;
};

export default postFormToAirtable;
