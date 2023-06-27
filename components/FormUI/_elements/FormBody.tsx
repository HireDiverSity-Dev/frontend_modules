import React from 'react';
import { FormUIProps } from '@/models/FormUI/FormUI';
import BooleanForm from '@/components/FormUI/BooleanForm';
import EmailAuthForm from '@/components/FormUI/EmailAuthForm';
import FileForm from '@/components/FormUI/FileForm';
import RateForm from '@/components/FormUI/RateForm';
import SelectForm from '@/components/FormUI/SelectForm';
import SignForm from '@/components/FormUI/SignForm';
import TextForm from '@/components/FormUI/TextForm';
import ParagraphForm from '@/components/FormUI/ParagraphForm/index';
import { Divider } from '@mui/material';

function FormBody(props: FormUIProps) {
  const type = props.uiSetting.data.type;
  let body: JSX.Element;
  switch (type) {
    case 'text':
      body = <TextForm {...props} />;
      break;
    case 'longtext':
      body = <TextForm {...props} multiline />;
      break;
    case 'file':
      body = <FileForm {...props} />;
      break;
    case 'rate':
      body = <RateForm {...props} />;
      break;
    case 'boolean':
      body = <BooleanForm {...props} />;
      break;
    case 'singleselect':
      body = <SelectForm {...props} />;
      break;
    case 'multiselect':
      body = <SelectForm {...props} multiple />;
      break;
    case 'signature':
      body = <SignForm {...props} />;
      break;
    case 'emailAuth':
      body = <EmailAuthForm {...props} />;
      break;
    case 'paragraph':
      body = <ParagraphForm {...props} />;
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
