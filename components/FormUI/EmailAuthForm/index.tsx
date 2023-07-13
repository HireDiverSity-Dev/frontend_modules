import React, { useState } from 'react';
import { Box, Checkbox } from '@mui/material';
import { getVerificationConfirmClient, postVerificationSendClient } from 'fe-modules/apis/client/verification';
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
  let langApi: string; // API 발송용 언어
  switch (lang) {
    case 'kr':
      langApi = 'korean';
      break;
    case 'en':
      langApi = 'english';
      break;
    case 'zh':
      langApi = 'chinese';
      break;
    default:
      langApi = 'english';
  }

  const [, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isSented, setIsSented] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [server, setServer] = useState({ invalid: false, msg: '' });

  const { field: emailField, fieldState: emailFieldState } = useController({
    name: `${name}.email` as string,
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
    emailField.onChange(e.target.value);
    verifyField.onChange(false);
    setIsVerified(false);
    setIsSented(false);
  };

  const onVerify = async () => {
    const emailValue = emailField.value;
    setEmail(emailValue);
    try {
      await postVerificationSendClient(emailValue, langApi);
      setIsSented(true);
      setServer({ invalid: false, msg: '' });
    } catch (error) {
      setIsSented(false);
      setServer({ invalid: true, msg: 'email verification failed' });
    }
  };

  const onConfirm = async () => {
    const emailValue = emailField.value;
    setEmail(emailValue);
    try {
      const res = await getVerificationConfirmClient(emailValue, code);
      if (res.status !== 200) throw new Error('email confirm failed');
      setIsVerified(true);
      emailField.onChange(emailValue);
      verifyField.onChange(true);
      setServer({ invalid: false, msg: '' });
    } catch (error) {
      setIsVerified(false);
      setServer({ invalid: true, msg: 'email confirm failed' });
    }
  };

  return (
    <FlexBox sx={{ flexDirection: 'column', gap: 2 }}>
      <Checkbox sx={{ display: 'none' }} name={`${name}.isVerified`} checked={isVerified} />
      <Box sx={style.box}>
        <FlexBox sx={{ flexDirection: 'column', width: '100' }}>
          <TextInput
            field={emailField}
            multiline={false}
            disabled={uiSetting.rule?.readonly ?? false}
            onCustomChange={onChange}
          />
          {emailFieldState.invalid && <TextError msg={emailFieldState.error?.message ?? ''} />}
          {server.invalid && <TextError msg={server.msg} />}
        </FlexBox>
        <EmailAuthButton isVerified={isVerified} onVerify={onVerify} lang={lang} />
        {isSented && !isVerified && (
          <EmailAuthCode name={name} code={code} setCode={setCode} onConfirm={onConfirm} lang={lang} />
        )}
      </Box>
      {isSented && !isVerified && <EmailAuthResendButton onVerify={onVerify} lang={lang} />}
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
