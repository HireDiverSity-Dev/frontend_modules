import { aws } from 'fe-modules/apis/network';

async function postUpdatePhone(recordId: string, phoneNumber: string) {
  const body = {
    recordId,
    phoneNumber,
  };
  return await aws.post('/airtable/updatePhone', body);
}

export { postUpdatePhone };
