import { django } from '../network';

export async function getPrice(univ: string) {
  return await django.get(`/payments/price/${univ}/`);
}

export async function postUpdatedEximPaymentInfo(orderId: string, data: any) {
  return await django.post(`/payments/exim/${orderId}/`, data);
}

export async function postUpdatedStripePaymentInfo(orderId: string, data: any) {
  return await django.post(`payments/stripe/${orderId}/`, data);
}
