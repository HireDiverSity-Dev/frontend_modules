import React, { useEffect, useState } from 'react';
import { Box, Checkbox } from '@mui/material';
import { FormUIProps } from '@/models/FormUI/FormUI';
import { set, useController } from 'react-hook-form';
import FlexBox from '@/components/basic/FlexBox';
import { ConfirmVerificationCode, SendVerificationEmail } from '@/remotes/form';
import EmailAuthButton from './EmailAuthButton';
import EmailAuthResendButton from './EmailAuthResendButton';
import EmailAuthCode from './EmailAuthCode';
import TextInput from '@/components/FormUI/TextForm/TextInput';
import TextError from '@/components/FormUI/TextForm/TextError';

function EmailAuthForm({ form, uiSetting, lang }: FormUIProps) {
  const name = uiSetting.formKey;

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isSented, setIsSented] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const { field, fieldState } = useController({
    name: `${name}`,
    control: form.control,
    rules: {
      required: uiSetting.rule?.required,
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/g,
        message: 'email pattern mismatch',
      },
    },
  });

  const { field: verifyField } = useController({
    name: `${name}.isVerified`,
    control: form.control,
    rules: {
      validate: (value) => value === true,
    },
    defaultValue: false,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.value);
    verifyField.onChange(false);
  };

  const onVerify = async () => {
    const email = field.value;
    setEmail(email);
    await SendVerificationEmail(email, lang).then((res) => {
      if (res.status === 200) {
        setIsSented(true);
      } else {
        setIsSented(false);
      }
    });
  };

  const onConfirm = async (input: string) => {
    const email = field.value;
    setEmail(email);
    await ConfirmVerificationCode(email, input).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setIsVerified(true);
        field.onChange(email);
        verifyField.onChange(true);
      }
    });
  };

  return (
    <FlexBox sx={{ flexDirection: 'column', gap: 2 }}>
      <Checkbox sx={{ display: 'none' }} name={`${name}.isVerified`} checked={isVerified} />
      <Box sx={style.box}>
        <FlexBox sx={{ flexDirection: 'column', width: '100' }}>
          <TextInput
            field={field}
            multiline={false}
            disabled={uiSetting.rule?.readonly ?? false}
            onCustomChange={onChange}
          />
          {fieldState.invalid && <TextError msg={fieldState.error?.message ?? ''} />}
        </FlexBox>
        <EmailAuthButton isVerified={isVerified} onVerify={onVerify} />
        {isSented && !isVerified && <EmailAuthCode name={name} code={code} setCode={setCode} onConfirm={onConfirm} />}
      </Box>
      {isSented && !isVerified && <EmailAuthResendButton onVerify={onVerify} />}
    </FlexBox>
  );
}

export default EmailAuthForm;

const style = {
  box: {
    display: 'grid',
    gridTemplateColumns: 'auto max-content',
    width: '100%',
    gap: 1,
  },
};
