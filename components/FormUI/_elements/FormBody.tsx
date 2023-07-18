import React from 'react';
import { Divider } from '@mui/material';
import BooleanForm from 'fe-modules/components/FormUI/BooleanForm';
import CheckboxForm from 'fe-modules/components/FormUI/CheckboxForm/index';
import DateForm from 'fe-modules/components/FormUI/DateForm';
import EmailAuthForm from 'fe-modules/components/FormUI/EmailAuthForm';
import FileForm from 'fe-modules/components/FormUI/FileForm';
import ParagraphForm from 'fe-modules/components/FormUI/ParagraphForm/index';
import RateForm from 'fe-modules/components/FormUI/RateForm';
import SelectForm from 'fe-modules/components/FormUI/SelectForm';
import SignForm from 'fe-modules/components/FormUI/SignForm';
import TextForm from 'fe-modules/components/FormUI/TextForm';
import { FormUIProps } from 'fe-modules/models/FormUI/FormUI';

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
    case 'checkbox':
      body = <CheckboxForm {...props} />;
      break;
    case 'date':
      body = <DateForm {...props} />;
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
