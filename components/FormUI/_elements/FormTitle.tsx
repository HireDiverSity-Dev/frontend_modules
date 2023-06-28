import React from 'react';
import { FormUISetting } from '@/models/FormUI/FormUI';
import { Lang } from '@/models/lang';
import { Typography } from '@mui/material';

interface FormTitleProps {
  uiSetting: FormUISetting;
  lang: Lang;
}

function Star() {
  return <p style={{ display: 'inline', color: 'red', marginLeft: '5px' }}>*</p>;
}

function FormTitle({ uiSetting, lang }: FormTitleProps) {
  return (
    <Typography variant="subtitle2" mb={1}>
      {uiSetting.data?.title?.[lang]}
      {uiSetting.rule?.required && <Star />}
    </Typography>
  );
}

export default FormTitle;
