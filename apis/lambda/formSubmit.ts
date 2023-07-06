import { lambda } from '../network';

export default async function formSubmit(formData: any) {
  return await lambda.post('/customForm/submit', formData);
}
