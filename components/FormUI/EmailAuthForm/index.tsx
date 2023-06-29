import React, { useState } from 'react';
import { Box, Checkbox } from '@mui/material';
import { ConfirmVerificationCode, SendVerificationEmail } from 'fe-modules/apis/client/request/verify';
import FlexBox from 'fe-modules/components/basic/FlexBox';
import EmailAuthButton from 'fe-modules/components/FormUI/EmailAuthForm/EmailAuthButton';
import EmailAuthCode from 'fe-modules/components/FormUI/EmailAuthForm/EmailAuthCode';
import EmailAuthResendButton from 'fe-modules/components/FormUI/EmailAuthForm/EmailAuthResendButton';
import TextError from 'fe-modules/components/FormUI/TextForm/TextError';
import TextInput from 'fe-modules/components/FormUI/TextForm/TextInput';
import { FormUIProps } from 'fe-modules/models/FormUI/FormUI';
import { useController } from 'react-hook-form';

function EmailAuthForm({ form, uiSetting, lang }: FormUIProps) {
  const name = uiSetting.formKey;

  const [, setEmail] = useState('');
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
    const emailValue = field.value;
    setEmail(emailValue);
    await SendVerificationEmail(emailValue, lang).then((res) => {
      if (res.status === 200) {
        setIsSented(true);
      } else {
        setIsSented(false);
      }
    });
  };

  const onConfirm = async (input: string) => {
    const emailValue = field.value;
    setEmail(emailValue);
    await ConfirmVerificationCode(emailValue, input).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setIsVerified(true);
        field.onChange(emailValue);
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
