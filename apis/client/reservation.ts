import { client } from '../network';

interface fingerprintRegisterParams {
  reservationDate: string;
  reservationTime: string;
  imgUrl: string;
}

export async function postFingerprintRegisterClient(params: fingerprintRegisterParams) {
  return await client.post('/reservation/fingerprint/register', params);
}

export async function patchFingerprintClient(params: fingerprintRegisterParams, recordId: string) {
  return await client.patch(`/reservation/fingerprint/${recordId}`, params);
}

interface receiveRegisterParams {
  appDownloadCheck?: boolean;
  appNotDownloadReason?: string[];
  appNotDownloadReasonRemark?: string;
  appUserWantFunction?: string;
  arcProcessConvenient?: string[];
  arcProcessConvenientRemark?: string;
  arcProcessInconvenient?: string[];
  arcProcessInconvenientRemark?: string;
  groupReceptionSatisfaction?: number;
  hirevisaId?: string;
  koreaLivingInconvenient?: string;
  notArcInconvenience?: string[];
  notArcInconvenienceRemark?: string;
  researchCheck?: boolean;
  reservationDate: string;
  reservationTime: string;
  imgUrl?: string;
  universityPolicySatisfaction?: boolean;
  universityPolicySatisfactionContent?: string;
  universitySatisfaction?: number;
  usimPurchase?: string;
  usimPurchaseRemark?: string;
}

export async function postReceiveRegisterClient(params: receiveRegisterParams) {
  return await client.post('/reservation/receive/register', params);
}

export async function patchReceiveClient(params: receiveRegisterParams, recordId: string) {
  return await client.patch(`/reservation/receive/${recordId}`, params);
}
