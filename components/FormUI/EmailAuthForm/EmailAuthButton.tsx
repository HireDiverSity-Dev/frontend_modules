import { Button } from '@mui/material';
import { Lang, Translation } from 'fe-modules/models/lang';

interface EmailAuthButtonProps {
  isVerified: boolean;
  onVerify: () => void;
  lang: Lang;
}

export default function EmailAuthButton({ isVerified, onVerify, lang }: EmailAuthButtonProps) {
  return (
    <Button
      variant="outlined"
      size="small"
      color={isVerified ? 'success' : 'primary'}
      onClick={isVerified ? () => {} : onVerify}
      sx={{ height: '56px' }}
    >
      {isVerified ? Label.인증완료[lang as keyof Translation] : Label.인증전[lang as keyof Translation]}
    </Button>
  );
}

const Label: { [key: string]: Translation } = {
  인증완료: {
    kr: '인증완료!',
    zh: '认证成功',
    en: 'Verified!',
  },
  인증전: {
    kr: '인증하기',
    zh: '进行认证',
    en: 'Verify',
  },
};
