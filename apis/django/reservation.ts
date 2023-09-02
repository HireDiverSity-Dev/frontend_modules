import { django } from '../network';

interface ReservationParams {
  type: string;
  slot_id: number;
  sign?: string;
}

export async function postReservationLog(email: string, data: ReservationParams) {
  return await django.post(`/reservation/${email}/`, data);
}

export async function patchReservationLog(email: string, data: ReservationParams) {
  return await django.patch(`/reservation/${email}/`, data);
}
