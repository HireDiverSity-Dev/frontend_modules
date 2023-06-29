import React from 'react';
import { Typography } from '@mui/material';
import { FormUISetting } from 'fe-modules/models/FormUI/FormUI';
import { Lang } from 'fe-modules/models/lang';

interface FormSemiTitleProps {
  uiSetting: FormUISetting;
  lang: Lang;
}

function FormSemiTitle({ uiSetting, lang }: FormSemiTitleProps) {
  return (
    <Typography
      variant="body1"
      mb={1}
      px={1}
      dangerouslySetInnerHTML={{
        __html: uiSetting.data.subtitle?.[lang] ?? '',
      }}
    ></Typography>
  );
}

export default FormSemiTitle;
