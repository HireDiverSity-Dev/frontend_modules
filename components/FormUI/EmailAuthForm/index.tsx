import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, TextField } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { FormProps } from '@/components/FormUI/index';
import TextForm from '@/components/FormUI/TextForm';
import FlexBox from '@/components/others/FlexBox';
import { ConfirmVerificationCode, SendVerificationEmail } from '@/remotes/form';

type Lang = 'korean' | 'english' | 'chinese';

function EmailAuthForm({ pageForm, setting, lang }: FormProps) {
  const { t } = useTranslation(['customForm']);

  const [email, setEmail] = useState<string>('');
  const [verified, setVerified] = useState(false);
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState<string>('');

  // register
  const name = setting.formKey;
  pageForm.register(`${name}.email`, {
    required: setting.rules?.required,
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/g,
      message: 'email pattern mismatch',
    },
  });
  pageForm.register(`${name}.verified`, {
    required: setting.rules?.required,
  });

  const newSettings = {
    ...setting,
    formKey: `${setting.formKey}`,
    formData: {
      ...setting.formData,
      rules: {
        ...setting.formData.rules,
        pattern: {
          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/g,
          message: 'email pattern mismatch',
        },
      },
    },
  };

  const { control } = pageForm;
  const watch = useWatch({
    control,
  });

  // 이메일 재설정
  useEffect(() => {
    console.log(watch[name]?.email);
    if (email !== watch[name]?.email) {
      setEmail(watch[name]?.email ?? '');
      setVerified(false);
      setSent(false);
      setCode('');
    }
  }, [watch[name]?.email]);

  useEffect(() => {
    pageForm.setValue(setting.formKey, { email: email, verified: verified ? true : undefined });
  }, [verified, watch.name]);

  // API 발송용 언어 세팅
  let language: Lang;
  switch (lang) {
    case 'kr':
      language = 'korean';
      break;
    case 'en':
      language = 'english';
      break;
    case 'zh':
      language = 'chinese';
      break;
    default:
      language = 'english';
  }

  // API: 인증 메일 발송
  const onVerify = async () => {
    await SendVerificationEmail(email, language).then((res) => {
      // 이메일 발송 여부 확인
      if (res.status === 200) {
        setSent(true);
      } else {
        setSent(false);
      }
    });
  };

  // API: 인증 번호 확인
  const onConfirm = async (input: string) => {
    await ConfirmVerificationCode(email, input).then((res) => {
      // 인증 번호 확인
      console.log(res);
      if (res.status === 200) {
        setVerified(true);
      }
    });
  };

  return (
    <FlexBox sx={{ flexDirection: 'column', gap: 2 }}>
      {/* test: 인증 확인용 */}
      <Checkbox
        sx={{ display: 'none' }}
        name={`${setting.formKey}.verified`}
        checked={verified}
        onChange={() => {
          console.log(pageForm.getValues(), pageForm.formState.errors);
        }}
      />
      {/* 인증란 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto max-content',
          width: '100%',
          gap: 1,
        }}
      >
        {/* 이메일 입력 */}
        {
          //@ts-ignore
          <TextForm pageForm={pageForm} setting={newSettings} lang={lang} emailAuth />
        }
        <Button
          variant="outlined"
          size="small"
          color={verified ? 'success' : 'primary'}
          onClick={verified ? () => {} : onVerify}
          sx={{ height: '56px' }}
        >
          {verified ? t(`폼.이메일인증.인증완료`) : t(`폼.이메일인증.인증전`)}
        </Button>
        {/* 인증코드 입력 */}
        {sent && !verified && (
          <>
            <TextField
              disabled={verified}
              name={`${setting.formKey}.code`}
              value={code}
              sx={{ flex: 1 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCode(event.target.value);
              }}
            />
            <Button disabled={verified} variant="outlined" size="small" onClick={() => onConfirm(code)}>
              {t(`폼.이메일인증.인증버튼`)}
            </Button>
          </>
        )}
      </Box>
      {sent && !verified && (
        <FlexBox sx={{ width: '100%', justifyContent: 'end' }}>
          <Button size="small" onClick={onVerify}>
            {t(`폼.이메일인증.재전송버튼`)}
          </Button>
        </FlexBox>
      )}
    </FlexBox>
  );
}

export default EmailAuthForm;
