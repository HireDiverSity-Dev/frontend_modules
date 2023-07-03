import { AxiosResponse } from 'axios';
import { admin } from '../network';

type numToString =
  | 'EIGHT'
  | 'EIGHTEEN'
  | 'ELEVEN'
  | 'FIFTEEN'
  | 'FIVE'
  | 'FOUR'
  | 'FOURTEEN'
  | 'NINE'
  | 'NINETEEN'
  | 'ONE'
  | 'SEVEN'
  | 'SEVENTEEN'
  | 'SIX'
  | 'SIXTEEN'
  | 'TEN'
  | 'THIRTEEN'
  | 'THREE'
  | 'TWELVE'
  | 'TWENTY'
  | 'TWENTY_FIVE'
  | 'TWENTY_FOUR'
  | 'TWENTY_ONE'
  | 'TWENTY_THREE'
  | 'TWENTY_TWO'
  | 'TWO';

export interface getUniversityResult {
  endDate: string;
  endTime: string;
  reservationEmployeeCount: numToString;
  reservationId: number;
  reservationName: string;
  reservationType: 'FINGERPRINT' | 'RECEIVE' | 'RESEARCH';
  startDate: string;
  startTime: string;
  timeSlot: number;
  univList: string;
}

export async function getUniversityAllAdmin(): Promise<AxiosResponse<getUniversityResult[]>> {
  return await admin.get('/university/all');
}

export interface getUniversityFingerprintResult {
  createTime: string;
  employeeCount: numToString;
  endDate: string;
  endTime: string;
  exclusionEndTime: string;
  exclusionStartTime: string;
  id: number;
  modifyTime: string;
  reservationName: string;
  reservationType: 'FINGERPRINT' | 'RECEIVE' | 'RESEARCH';
  startDate: string;
  startTime: string;
  timeSlot: number;
  univList: string;
}

export async function getUniversityFingerprintAdmin(): Promise<AxiosResponse<getUniversityFingerprintResult[]>> {
  return await admin.get('/university/fingerprint');
}

export interface getUniversityReceiveResult {
  fingerPrint: {
    endDate: string;
    endTime: string;
    reservationEmployeeCount: numToString;
    startDate: string;
    startTime: string;
    univList: string;
    univName: string;
    universityId: number;
  }[];
  receive: {
    endDate: string;
    endTime: string;
    reservationEmployeeCount: numToString;
    startDate: string;
    startTime: string;
    univList: string;
    univName: string;
    universityId: number;
  }[];
}

export async function getUniversityInfoAdmin(id: number): Promise<AxiosResponse<getUniversityReceiveResult>> {
  return await admin.get(`/university/info/${id}`);
}
export async function getUniversityReceiveAdmin(): Promise<AxiosResponse<getUniversityFingerprintResult[]>> {
  return await admin.get('/university/receive');
}

// Todo: 사용하지 않는 함수면 삭제해주세요.
/*
import { NumberWord, Univ } from 'fe-modules/models/reserve';
interface PatchReserveInfoData {
  univName: string;
  startDate: string;
  endDate: string;
  employeeCount: NumberWord;
}

export async function PatchReserveInfoApi(univ: Univ, data: PatchReserveInfoData) {
  console.log(data);
  return await admin.patch(`/university/info/${ReserveInfo.univ[univ]}`, data);
}
*/
