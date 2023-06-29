import { Button } from '@mui/material';
import FlexBox from 'fe-modules/components/basic/FlexBox';
import { useTranslation } from 'next-i18next';

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
