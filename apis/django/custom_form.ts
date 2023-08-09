import { SupportLanguage } from 'fe-modules/models/lang';
import { django } from '../network';

export default async function sendVerificationEmail(email: string, lang: SupportLanguage) {
  return await django.get(`/custom_form/verification/${email}/${lang}/`);
}
