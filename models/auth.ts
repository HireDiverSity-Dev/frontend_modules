import { LangServer } from 'fe-modules/models/lang';

export const enum Status {
  VALID = 'valid',
  INVALID = 'invalid',
  NOTREADY = 'notready',
}

export interface Auth {
  status: Status;
  recordId: string;
  accessToken: string;
  refreshToken: string;
  email: string;
  primaryLanguage: LangServer;
  userVisaStatus?: 'NEW' | 'EXTENSION' | 'CHANGE';
}

export const DefaultAuth: Auth = {
  status: Status.NOTREADY,
  recordId: '',
  accessToken: '',
  refreshToken: '',
  email: '',
  primaryLanguage: LangServer.ENG,
};
