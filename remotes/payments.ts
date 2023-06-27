import { lambda } from '../utils/network';

export async function SavePaypalOrder(data: string) {
  // 페이팔 결제 정보 넘기기
  try {
    const res = await lambda.post('/v1/payments/paypal/single', data);
    return res;
  } catch (err) {
    console.log('Error', err);
  }
}

export async function CreateFgkey(data: string) {
  // 엑심베이 fgkey 발급
  try {
    const res = await lambda.post('/v1/payments/exim/single', data);
    return res;
  } catch (err) {
    console.log('Error', err);
  }
}
