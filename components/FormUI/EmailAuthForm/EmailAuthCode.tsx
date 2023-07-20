import { Button, TextField } from '@mui/material';
import { Lang, Translation } from 'fe-modules/models/lang';

interface EmailAuthCodeProps {
  name: string;
  code: string;
  setCode: (code: string) => void;
  onConfirm: (code: string) => void;
  isInvalid?: boolean;
  lang: Lang;
}

export default function EmailAuthCode({ name, code, setCode, onConfirm, isInvalid, lang }: EmailAuthCodeProps) {
  return (
    <>
      <TextField
        name={`${name}.code`}
        value={code}
        sx={{ flex: 1 }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setCode(event.target.value);
        }}
        error={isInvalid}
      />
      <Button variant="outlined" size="small" onClick={() => onConfirm(code)}>
        {Label.인증버튼[lang as keyof Translation]}
      </Button>
    </>
  );
}

const Label: { [key: string]: Translation } = {
  인증버튼: {
    zh: '发送验证码',
    kr: '인증하기',
    en: 'Verify',
  },
};
