import { VisaStatus } from 'fe-modules/models/user';
import { admin } from '../network';

interface UpdateUserInfoProps {
  recordId: string;
  email: string;
  univ: string;
  birth: string;
  userStatus: string;
}

export async function GetUserList() {
  return await admin.get('/user');
}

export async function UpdateUserInfo(data: UpdateUserInfoProps) {
  return await admin.patch('/user/info', data);
}

export async function UpdateUserVisaStatus(email: string, visaStatus: VisaStatus) {
  return await admin.patch('/user/changeVisaStatus', {
    email,
    newVisaStatus: visaStatus,
  });
}

export async function ResetPassword(email: string) {
  return await admin.patch(`/user/repassword?email=${email}`);
}
