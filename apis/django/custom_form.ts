import { django } from '../network';
import { SupportLanguage } from 'fe-modules/models/lang';

export default async function sendVerificationEmail(email: string, lang: string) {
  return await django.get(`/custom_form/verification/${email}/${lang}/`);
}