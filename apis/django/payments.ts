import { django } from '../network';

export async function getPrice(univ: string) {
  return await django.get(`/payments/price/${univ}/`);
}

export async function postUpdatedPaymentInfo(orderId: string, data: any) {
  return await django.post(`payments/stripe/${orderId}/`, data);
}
