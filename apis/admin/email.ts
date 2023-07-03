import { AxiosResponse } from 'axios';
import { admin } from '../network';

export interface emailSendParams {
  bccList?: string[];
  ccList?: string[];
  content?: string;
  emailList: string[];
  senderEmail: string;
  title: string;
}

export async function postEmailSendAdmin(params: emailSendParams): Promise<AxiosResponse> {
  return await admin.post('/email/send', params);
}

export interface emailSendAttachParams extends emailSendParams {
  attachList: string[];
}

export async function postEmailSendAttachAdmin(params: emailSendParams): Promise<AxiosResponse> {
  return await admin.post('/email/send/attach', params);
}
