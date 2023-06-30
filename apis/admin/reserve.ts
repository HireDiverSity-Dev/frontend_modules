import { NumberWord, Univ } from 'fe-modules/models/reserve';
import { admin } from '../network';

export async function GetReserveInfoApi(univ: Univ) {
  return await admin.get(`university/info/${ReserveInfo.univ[univ]}`);
}

interface PatchReserveInfoData {
  univName: string;
  startDate: string;
  endDate: string;
  employeeCount: NumberWord;
}

export async function PatchReserveInfoApi(univ: Univ, data: PatchReserveInfoData) {
  console.log(data);
  return await admin.patch(`university/info/${ReserveInfo.univ[univ]}`, data);
}
