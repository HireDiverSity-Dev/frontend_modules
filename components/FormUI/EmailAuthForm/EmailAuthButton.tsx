import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface EmailAuthButtonProps {
  isVerified: boolean;
  onVerify: () => void;
}

export default function EmailAuthButton({ isVerified, onVerify }: EmailAuthButtonProps) {
  const { t } = useTranslation(['customForm']);
  return (
    <Button
      variant="outlined"
      size="small"
      color={isVerified ? 'success' : 'primary'}
      onClick={isVerified ? () => {} : onVerify}
      sx={{ height: '56px' }}
    >
      {isVerified ? t(`폼.이메일인증.인증완료`) : t(`폼.이메일인증.인증전`)}
    </Button>
  );
}
