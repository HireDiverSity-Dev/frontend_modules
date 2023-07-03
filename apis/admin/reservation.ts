import { AxiosResponse } from 'axios';
import { admin } from '../network';

export interface getReservationResult {
  fingerPrint: {
    reservationCount: number;
    reservationDate: string;
    reservationTime: string;
    reservationType: 'FINGERPRINT' | 'RECEIVE' | 'RESEARCH';
  }[];
  receive: {
    reservationCount: 0;
    reservationDate: string;
    reservationTime: string;
    reservationType: 'FINGERPRINT' | 'RECEIVE' | 'RESEARCH';
  }[];
}

export async function getReservationAdmin(id: number): Promise<AxiosResponse<getReservationResult>> {
  return await admin.get(`/reservation/${id}`);
}

export interface reservationParams {
  employeeCount: string;
  endDate: string;
  endTime: string;
  exclusionEndTime: string;
  exclusionStartTime: string;
  reservationName: string;
  reservationType: string;
  startDate: string;
  startTime: string;
  timeSlot: number;
  univList: string[];
}

export interface postReservationResult {
  id: {
    [prop: string]: number;
  };
}

export async function postReservationAdmin(params: reservationParams): Promise<AxiosResponse<postReservationResult>> {
  return await admin.post('/reservation', params);
}

export async function patchReservationAdmin(
  params: reservationParams,
  id: number,
  type: string,
): Promise<AxiosResponse> {
  return await admin.patch(`/reservation/${id}/${type}`, params);
}
