import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import FlexBox from 'fe-modules/components/basic/FlexBox';
import { Lang, Translation } from 'fe-modules/models/lang';

export default function EmailAuthResentButton({ onVerify, lang }: { onVerify: () => void; lang: Lang }) {
  const [resend, setResend] = useState(false);
  return (
    <FlexBox sx={{ width: '100%', justifyContent: 'space-between' }}>
      <Button
        size="small"
        onClick={() => {
          onVerify();
          setResend(true);
        }}
      >
        {Label.재전송버튼[lang as keyof Translation]}
      </Button>
      {resend && <Typography variant="body2">{Label.재전송완료[lang as keyof Translation]}</Typography>}
    </FlexBox>
  );
}

const Label: { [key: string]: Translation } = {
  재전송버튼: {
    kr: '이메일 다시 보내기',
    zh: '再次发送验证码',
    en: 'Resend Email',
  },
  재전송완료: {
    kr: '인증코드가 다시 전송되었습니다',
    zh: '已再次发送验证码',
    en: 'The verification code has been sent again',
  },
};
