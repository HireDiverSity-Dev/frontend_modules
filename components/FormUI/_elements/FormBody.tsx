import React from 'react';
import { FormUIProps } from '@/models/form/FormUI';
import BooleanForm from '@/components/FormUI/BooleanForm';
import EmailAuthForm from '@/components/FormUI/EmailAuthForm';
import FileForm from '@/components/FormUI/FileForm';
import RateForm from '@/components/FormUI/RateForm';
import SelectForm from '@/components/FormUI/SelectForm';
import SignForm from '@/components/FormUI/SignForm';
import TextForm from '@/components/FormUI/TextForm';
import ParagraphForm from '@/components/FormUI/ParagraphForm/index';
import { Divider } from '@mui/material';

function FormBody({ form, uiSetting, lang }: FormUIProps) {
  const type = uiSetting.formData.type;
  let body: JSX.Element;
  switch (type) {
    case 'text':
      body = <TextForm form={form} uiSetting={uiSetting} lang={lang} />;
      break;
    case 'longtext':
      body = <TextForm form={form} uiSetting={uiSetting} lang={lang} multiline />;
      break;
    case 'file':
      body = <FileForm form={form} uiSetting={uiSetting} lang={lang} />;
      break;
    case 'rate':
      body = <RateForm form={form} uiSetting={uiSetting} lang={lang} />;
      break;
    case 'boolean':
      body = <BooleanForm form={form} uiSetting={uiSetting} lang={lang} />;
      break;
    case 'singleselect':
      body = <SelectForm form={form} uiSetting={uiSetting} lang={lang} />;
      break;
    case 'multiselect':
      body = <SelectForm form={form} uiSetting={uiSetting} lang={lang} multiple />;
      break;
    case 'signature':
      body = <SignForm form={form} uiSetting={uiSetting} lang={lang} />;
      break;
    case 'emailAuth':
      body = <EmailAuthForm form={form} uiSetting={uiSetting} lang={lang} />;
      break;
    case 'paragraph':
      body = <ParagraphForm form={form} uiSetting={uiSetting} lang={lang} />;
      break;
    case 'divider':
      body = <Divider sx={{ my: 3 }} />;
      break;
    default:
      body = <>test</>;
      break;
  }
  return body;
}

export default FormBody;
