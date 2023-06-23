import React, { useEffect } from 'react';
import { FormControlLabel, RadioGroup, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import { useController } from 'react-hook-form';
import { BooleanFormObj } from '@/models/form/formItem';
import { FormProps } from '..';

function SelectForm({ pageForm, setting, lang }: FormProps) {
  const formData = setting.formData as BooleanFormObj;
  const { field } = useController({
    name: setting.formKey,
    control: pageForm.control,
    rules: {
      validate: {
        ...setting.rules,
        //@ts-ignore
      }?.required
        ? {
            required: (value) => {
              if (value === true || value === false) {
                return true;
              }
              return false;
            },
          }
        : undefined,
    },
  });

  useEffect(() => {
    if (setting.rules?.default && setting.defaultValue != undefined) {
      field.onChange(setting.defaultValue as boolean);
    }
  }, [setting.rules?.default, setting.defaultValue]);

  const handleChange = (bool: boolean) => {
    field.onChange(bool);
  };

  const vertical = formData?.style === 'vertical';
  return (
    <>
      <RadioGroup
        //기본은 horizontal 옵션에 따라 verticl
        row={!vertical}
        sx={{ justifyContent: 'space-evenly', mx: 2 }}
      >
        <FormControlLabel
          value={'true'}
          control={
            <Radio
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: '1.8rem',
                },
              }}
              checked={field.value === true}
              onChange={() => {
                handleChange(true);
              }}
            />
          }
          label={
            <Typography variant="body1" sx={{ fontSize: '1.2rem', p: '0.4rem' }}>
              {formData?.options?.[0]?.label?.[lang] || Label.true[lang]}
            </Typography>
          }
          sx={
            vertical
              ? {
                  '.MuiFormControlLabel-label': {
                    flex: 1,
                  },
                  mb: '0.5rem',
                  display: 'flex',
                  alignItems: 'start',
                  width: '100%',
                }
              : {}
          }
          disabled={setting.rules?.readonly}
        />
        <FormControlLabel
          value={'false'}
          control={
            <Radio
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: '1.8rem',
                },
              }}
              checked={field.value === false}
              onChange={() => {
                handleChange(false);
              }}
            />
          }
          label={formData?.options?.[1]?.label?.[lang] || Label.false[lang]}
          sx={{
            '.MuiFormControlLabel-label': {
              fontSize: '1.2rem',
            },
          }}
          disabled={setting.rules?.readonly}
        />
      </RadioGroup>
    </>
  );
}

const Label = {
  true: {
    kr: '예',
    en: 'Yes',
    zh: '是的',
  },
  false: {
    kr: '아니오',
    en: 'No',
    zh: '不',
  },
};

export default SelectForm;
