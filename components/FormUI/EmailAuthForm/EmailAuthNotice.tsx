import React from 'react';
import { Alert, AlertTitle, Typography } from '@mui/material';
import { Translation } from 'fe-modules/models/lang';
import { SupportLanguage } from 'fe-modules/models/lang';

function EmailAuthNotice({ lang }: { lang: SupportLanguage }) {
  return (
    <Alert variant="outlined" severity="info" sx={{ my: 2 }}>
      <AlertTitle>Notice</AlertTitle>
      {Label.map((val) => (
        <Typography variant="body2">{`- ${val[lang]}`}</Typography>
      ))}
    </Alert>
  );
}

export default EmailAuthNotice;

const Label: Array<Translation> = [
  new Translation({
    kr: '"인증하기" 버튼을 눌러 이메일을 인증해주세요.',
    zh: '请点击“点击验证”按钮来验证您的邮箱。',
    en: 'Press "VERIFY" button to authenticate your email.',
  }),
  new Translation({
    kr: '인증 메일을 받지 못했다면 스팸 메일함을 확인해주세요.',
    en: "If you haven't received an authentication mail, please check your spam mail box.",
  }),
  new Translation({
    kr: '또는 연락처에 하이어비자 공식 이메일(official@hirediversity.club)을 추가해주시면 이메일을 받으실 수 있습니다.',
    en: 'Or, you can receive the email by adding the HireVisa official email(official@hirediversity.club) to your email contacts list.',
  }),
  new Translation({
    kr: '만약 위 방법으로도 이메일을 받지 못하셨다면, 다른 이메일을 사용해주세요.',
    en: "If you haven't received the email by the above method, please use another email.",
  }),
];
