import React from 'react';
import { Box } from '@mui/system';
import { FormUIProps } from '@/models/form/FormUI';
import SetSetting from './SetSetting';
import FormBody from '@/components/FormUI/_elements/FormBody';
import FormSemiTitle from '@/components/FormUI/_elements/FormSemiTitle';
import FormTitle from '@/components/FormUI/_elements/FormTitle';
import FormError from '@/components/FormUI/_elements/FormError';
import FormBox from '@/components/FormUI/_elements/FormBox';

function FormUI({ form, uiSetting, lang }: FormUIProps) {
  const newSetting = SetSetting(form, uiSetting);

  if (newSetting.rules?.invisible) return <></>;
  if (newSetting.formData.type === 'signature') {
    return (
      <FormBox>
        <FormBody form={form} uiSetting={newSetting} lang={lang} />
      </FormBox>
    );
  }
  return (
    <FormBox>
      <FormTitle uiSetting={newSetting} lang={lang} />
      {form.formState.errors[newSetting.formKey] && <FormError msg={'check your answer'} />}
      <FormSemiTitle uiSetting={newSetting} lang={lang} />
      <FormBody form={form} uiSetting={newSetting} lang={lang} />
    </FormBox>
  );
}

export default FormUI;
