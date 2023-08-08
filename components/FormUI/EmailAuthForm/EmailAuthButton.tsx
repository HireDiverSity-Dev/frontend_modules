import { Button } from '@mui/material';
import { SupportLanguage, Translation } from 'fe-modules/models/lang';

interface EmailAuthButtonProps {
  isInvalid: boolean;
  isVerified: boolean;
  isSented: boolean;
  onVerify: () => void;
  lang: SupportLanguage;
}

export default function EmailAuthButton({ isInvalid, isVerified, isSented, onVerify, lang }: EmailAuthButtonProps) {
  return (
    <Button
      disabled={(isSented && !isVerified) || isInvalid}
      variant="outlined"
      size="small"
      color={isVerified ? 'success' : 'primary'}
      onClick={isVerified ? () => {} : onVerify}
      sx={{ height: '56px' }}
    >
      {isVerified ? Label.인증완료[lang] : Label.인증전[lang]}
    </Button>
  );
}

const Label: { [key: string]: Translation } = {
  인증완료: new Translation({
    kr: '인증완료!',
    zh: '认证成功',
    en: 'Verified!',
  }),
  인증전: new Translation({
    kr: '코드발송',
    zh: '发送验证码',
    en: 'Send code',
  }),
};
