import { django } from '../network';

export default async function getOrder(email: string, order_type: string, autoAdd: boolean = false) {
  return await django.get(`/user/${email}/order/${order_type}/?autoAdd=${autoAdd}`);
}
