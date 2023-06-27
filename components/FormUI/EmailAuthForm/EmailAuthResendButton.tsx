import FlexBox from '@/components/basic/FlexBox';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function EmailAuthResentButton({ onVerify }: { onVerify: () => void }) {
  const { t } = useTranslation(['customForm']);

  return (
    <FlexBox sx={{ width: '100%', justifyContent: 'end' }}>
      <Button size="small" onClick={onVerify}>
        {t(`폼.이메일인증.재전송버튼`)}
      </Button>
    </FlexBox>
  );
}
