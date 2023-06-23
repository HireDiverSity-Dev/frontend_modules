import React, { useEffect, useState } from 'react';
import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import { ParagraphFormObj } from '@/models/form/formItem';
import { FormSettings } from '@/models/form/formPage';
import { Lang } from '@/models/lang';
import BooleanForm from './BooleanForm';
import EmailAuthForm from './EmailAuthForm';
import FileForm from './FileForm';
import RateForm from './RateForm';
import SelectForm from './SelectForm';
import SetSetting from './SetSetting';
import SignForm from './SignForm/SignForm';
import TextForm from './TextForm';

export interface FormProps {
  lang: Lang;
  pageForm: UseFormReturn<FieldValues, any>;
  setting: FormSettings;
}

function FormUI({ lang, pageForm, setting }: FormProps) {
  const type = setting.formData.type;
  const able = true;
  const newSetting = SetSetting(pageForm, setting);

  let FormBody;
  switch (type) {
    case 'text':
      FormBody = <TextForm lang={lang} pageForm={pageForm} setting={newSetting} />;
      break;
    case 'longtext':
      FormBody = <TextForm lang={lang} pageForm={pageForm} setting={newSetting} multiline />;
      break;
    case 'file':
      FormBody = <FileForm lang={lang} pageForm={pageForm} setting={newSetting} />;
      break;
    case 'rate':
      FormBody = <RateForm lang={lang} pageForm={pageForm} setting={newSetting} />;
      break;
    case 'boolean':
      FormBody = <BooleanForm lang={lang} pageForm={pageForm} setting={newSetting} />;
      break;
    case 'multiselect':
      FormBody = <SelectForm multiple lang={lang} pageForm={pageForm} setting={newSetting} />;
      break;
    case 'singleselect':
      FormBody = <SelectForm lang={lang} pageForm={pageForm} setting={newSetting} />;
      break;
    case 'signature':
      FormBody = <SignForm lang={lang} pageForm={pageForm} setting={newSetting} />;
      break;
    case 'emailAuth':
      FormBody = <EmailAuthForm lang={lang} pageForm={pageForm} setting={newSetting} />;
      break;
    case 'paragraph':
      FormBody = (
        <div
          className="paragraph"
          dangerouslySetInnerHTML={{ __html: (newSetting.formData as ParagraphFormObj).text[lang] }}
        />
      );
      break;
    case 'divider':
      FormBody = <Divider sx={{ my: 3 }} />;
      break;
    default:
      FormBody = <>test</>;
      break;
  }

  if (able) {
    return (
      <Box
        sx={{
          width: '100%',
          mt: 2,
          position: 'relative',
          p: 2,
          display: newSetting.rules?.invisible ? 'none' : undefined,
        }}
      >
        {type !== 'signature' && (
          <>
            <Typography variant="subtitle2" mb={1}>
              <>
                {newSetting.formData?.title?.[lang]}
                {newSetting.rules?.required && <p style={{ display: 'inline', color: 'red', marginLeft: '5px' }}>*</p>}
              </>
            </Typography>
            {pageForm.formState.errors[newSetting.formKey] && (
              <Typography variant="body2" mb={2}>
                <p style={{ color: 'red' }}>
                  {pageForm.formState.errors[newSetting.formKey]?.type === 'required' && 'answer required'}
                </p>
              </Typography>
            )}
            {newSetting.formData?.subtitle && (
              <Typography
                variant="body1"
                mb={1}
                px={1}
                dangerouslySetInnerHTML={{
                  __html: newSetting.formData?.subtitle?.[lang] ?? '',
                }}
              ></Typography>
            )}
          </>
        )}
        {FormBody}
      </Box>
    );
  } else {
    return <></>;
  }
}

export default FormUI;
