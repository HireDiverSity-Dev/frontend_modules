import React from 'react';
import { Typography } from '@mui/material';
import { FormUISetting } from 'fe-modules/models/FormUI/FormUI';
import { SupportLanguage } from 'fe-modules/models/lang';

interface FormTitleProps {
  uiSetting: FormUISetting;
  lang: SupportLanguage;
}

function Star() {
  return <p style={{ display: 'inline', color: 'red', marginLeft: '5px' }}>*</p>;
}

function FormTitle({ uiSetting, lang }: FormTitleProps) {
  if (uiSetting.data?.title === undefined) return <></>;
  return (
    <Typography variant="subtitle2" mb={1}>
      {uiSetting.data?.title?.[lang]}
      {uiSetting.rule?.required && <Star />}
    </Typography>
  );
}

export default FormTitle;
