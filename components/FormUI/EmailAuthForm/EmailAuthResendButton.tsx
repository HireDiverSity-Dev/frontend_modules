import { Button } from '@mui/material';
import FlexBox from 'fe-modules/components/basic/FlexBox';
import { Translation } from 'fe-modules/models/lang';
import { Lang } from '@/types/user/UserType';

export default function EmailAuthResentButton({ onVerify, lang }: { onVerify: () => void; lang: Lang }) {
  return (
    <FlexBox sx={{ width: '100%', justifyContent: 'end' }}>
      <Button size="small" onClick={onVerify}>
        {Label.재전송버튼[lang as keyof Translation]}
      </Button>
    </FlexBox>
  );
}

const Label: { [key: string]: Translation } = {
  재전송버튼: {
    kr: '이메일 다시 보내기',
    zh: '再次发送验证码',
    en: 'Resend Email',
  },
};
