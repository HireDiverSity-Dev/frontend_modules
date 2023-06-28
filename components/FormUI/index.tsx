import React from 'react';
import { FormUIProps } from '@/models/FormUI/FormUI';
import SetSetting from './SetSetting';
import FormBody from '@/components/FormUI/_elements/FormBody';
import FormSemiTitle from '@/components/FormUI/_elements/FormSemiTitle';
import FormTitle from '@/components/FormUI/_elements/FormTitle';
import FormError from '@/components/FormUI/_elements/FormError';
import FormBox from '@/components/FormUI/_elements/FormBox';
import { Translation } from '@/models/lang';

function FormUI({ form, uiSetting, lang, auth }: FormUIProps) {
  const newSetting = SetSetting(form, uiSetting);

  if (newSetting.rule?.invisible) return <></>;
  if (newSetting.data.type === 'signature') {
    newSetting.data = {
      ...newSetting.data,
      title: SignatureLabel.title,
      subtitle: SignatureLabel.subtitle,
    };
  }
  console.log('FormUI', newSetting);
  return (
    <FormBox>
      <FormTitle uiSetting={newSetting} lang={lang} />
      {form.formState.errors[newSetting.formKey] && <FormError msg={'check your answer'} />}
      <FormSemiTitle uiSetting={newSetting} lang={lang} />
      <FormBody form={form} uiSetting={newSetting} lang={lang} auth={auth} />
    </FormBox>
  );
}

const SignatureLabel: { [key: string]: Translation } = {
  title: {
    kr: '서명',
    zh: '签名',
    en: 'Signature',
  },
  subtitle: {
    kr: '동의하시면 서명(*여권 상 이름으로 서명)',
    zh: '同意的话请签名（*签护照上的英文姓名）',
    en: 'If you agree to all of the terms below, please select Agree and sign the e-signature',
  },
};

export default FormUI;
