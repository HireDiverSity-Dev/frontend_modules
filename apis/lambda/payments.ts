import { lambda } from '../network';

export async function postPaypalOrderToLambda(data: string) {
  try {
    const res = await lambda.post('/payments/paypal/single', data);
    return res;
  } catch (err) {
    console.log('Error', err);
  }
}

export async function getFgkeyFromLambda(data: string) {
  // 엑심베이 fgkey 발급
  try {
    const res = await lambda.post('/payments/exim/single', data);
    return res;
  } catch (err) {
    console.log('Error', err);
  }
}
