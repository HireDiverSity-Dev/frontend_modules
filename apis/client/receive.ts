import { client } from '../network';

interface Receive {
  reservationDate: string;
  reservationTime: string;
  imgUrl?: string;
  hirevisaId?: string;
  groupReceptionSatisfaction?: number;
  universitySatisfaction?: number;
  universityPolicySatisfaction?: boolean;
  universityPolicySatisfactionContent?: string;
  koreaLivingInconvenient?: string;
  appDownloadCheck?: boolean;
  appNotDownloadReason?: Array<string>;
  appNotDownloadReasonRemark?: string;
  appUserWantFunction?: string;
  researchCheck?: boolean;
  arcProcessConvenient?: Array<string>;
  arcProcessConvenientRemark?: string;
  arcProcessInconvenient?: Array<string>;
  arcProcessInconvenientRemark?: string;
  notArcInconvenience?: Array<string>;
  notArcInconvenienceRemark?: string;
}

export async function reserveReceiveApi(data: Receive) {
  try {
    const res = await client.post('/reservation/receive/register', data);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function changeReceiveApi(reserveId: string, data: Receive) {
  try {
    const res = await client.patch(`/reservation/receive/${reserveId}`, data);
    return res;
  } catch (err) {
    console.log('Error', err);
  }
}
