import React, { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { useController } from 'react-hook-form';
import { RegisterOptions } from 'react-hook-form';
import FlexBox from '@/components/others/FlexBox';
import { FormProps } from '..';

function TextForm({
  lang,
  pageForm,
  setting,
  multiline,
  emailAuth,
}: FormProps & { multiline?: boolean; emailAuth?: boolean }) {
  const name = emailAuth ? `${setting.formKey}.email` : setting.formKey;
  const rules = { ...setting.rules, disabled: false } as RegisterOptions;
  let { field } = useController({
    control: pageForm.control,
    name: name,
    rules: rules,
    defaultValue: '',
  });

  const [valid, setValid] = useState<boolean>(true);
  const handleValidation = (event: any) => {
    if (setting.formData.rules?.pattern) {
      //@ts-ignore
      const regex = new RegExp(setting.formData.rules?.pattern?.value);
      setValid(regex.test(event.target.value) || (!setting.rules?.required && event.target.value === ''));
    } else {
      setValid(true);
    }
    pageForm.setValue(name, event.target.value);
  };

  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100' }}>
      <TextField
        onChange={handleValidation}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        placeholder={setting.formData.placeholder?.[lang]}
        inputRef={field.ref}
        multiline={multiline}
        fullWidth
        // InputProps={{
        //   readOnly: setting.rules?.readonly,
        // }}
        disabled={setting.rules?.readonly}
        error={!valid}
      />
      <Typography
        variant="caption"
        color="error"
        sx={{ display: valid ? 'none' : undefined, textAlign: 'start', width: '100%' }}
      >
        {
          //@ts-ignore
          setting.formData.rules?.pattern?.message
        }
      </Typography>
    </FlexBox>
  );
}

export default TextForm;
