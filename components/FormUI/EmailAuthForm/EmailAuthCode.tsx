import { Button, TextField } from '@mui/material';
import { useTranslation } from 'next-i18next';

interface EmailAuthCodeProps {
  name: string;
  code: string;
  setCode: (code: string) => void;
  onConfirm: (code: string) => void;
}

export default function EmailAuthCode({ name, code, setCode, onConfirm }: EmailAuthCodeProps) {
  const { t } = useTranslation(['customForm']);
  return (
    <>
      <TextField
        name={`${name}.code`}
        value={code}
        sx={{ flex: 1 }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setCode(event.target.value);
        }}
      />
      <Button variant="outlined" size="small" onClick={() => onConfirm(code)}>
        {t(`폼.이메일인증.인증버튼`)}
      </Button>
    </>
  );
}
