import { django } from '../network';

export default async function getPrice(univ: string) {
  return await django.get(`/payments/price/${univ}/`);
}
