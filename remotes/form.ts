import FormData from '@/assets/data/FormData.json';
import { 연장_AirtableRecord } from '@/models/airtable';
import { FormValue } from '@/models/form/formPage';
import { FormKeys, ImageGroup } from '@/models/form_deprecated';
import { airtable, client, s3 } from '@/utils/network';

export const UploadFileApi = async (path: string, file: File, callbackFunc?: (() => void) | undefined) => {
  const body = {
    name: path,
    type: file.type,
  };

  try {
    // 1단계 : signed url 가져오기
    const urlRes = await s3.post('/signedUrl', body);
    const signedUrl = urlRes.data;

    //console.log(urlRes);

    // 2단계 : 가져온 url로 put 요청 보내기
    // 이미 파일 이름이나 경로 등은 url 받아올 때 지정을 다 해놨으므로,
    // image 파일 객체와 Content-type 정보만 넣어서 보냄
    await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-type': file.type,
      },
    });
    if (callbackFunc) {
      callbackFunc();
    }
  } catch (err) {
    console.log(err);
  }
};

export const ResubmitApi = async (recordId: string, images: ImageGroup, callbackFunc?: () => void) => {
  const body = {
    recordId,
    images,
  };

  try {
    const res = await airtable.post('/supplement', body);
    console.log(res);
    if (callbackFunc) callbackFunc();
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const 연장_ResubmitApi = async (recordId: string, docs: 연장_AirtableRecord, callbackFunc?: () => void) => {
  const body = {
    recordId,
    docs,
  };

  try {
    const res = await airtable.post('/extend/supplement', body);
    console.log(res);
    if (callbackFunc) callbackFunc();
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const UpdatePhoneApi = async (recordId: string, phoneNumber: string, callbackFunc?: () => void) => {
  const body = {
    recordId,
    phoneNumber,
  };

  try {
    const res = await airtable.post('/updatePhone', body);
    console.log(res);
    if (callbackFunc) callbackFunc();
    return res;
  } catch (err) {
    console.log(err);
  }
};

interface Fingerprint {
  reservationDate: string;
  reservationTime: string;
  imgUrl: string;
}

export async function reserveFingerprintApi(data: Fingerprint) {
  try {
    const res = await client.post('/reservation/fingerprint/register', data);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function changeFingerprintApi(reserveId: string, data: Fingerprint) {
  try {
    const res = await client.patch(`/reservation/fingerprint/${reserveId}`, data);
    return res;
  } catch (err) {
    console.log('Error', err);
  }
}

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

export async function SendVerificationEmail(email: string, lang: string) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  const url = `verification/send?email=${email}&language=${lang}`;
  return await client.post(url, config);
}

export async function ConfirmVerificationCode(email: string, code: string) {
  console.log(email, code);
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  const url = `verification/confirm?email=${email}&code=${code}`;
  return await client.get(url, config);
}

interface SubmitFormProps {
  airtable?: {
    base: string;
    table: string;
    col: string;
  };
  server?: string;
  value: FormValue;
}

export async function SubmitForm(data: Array<SubmitFormProps>, recordId: string | undefined = undefined) {
  const url = recordId ? `resubmit/${recordId}` : `submit`;
  const config = {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  console.log(data);
  return await client.post(url, config);
}
