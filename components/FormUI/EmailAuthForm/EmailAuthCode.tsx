import { Button, TextField } from '@mui/material';
import { SupportLanguage, Translation } from 'fe-modules/models/lang';

interface EmailAuthCodeProps {
  name: string;
  code: string;
  setCode: (code: string) => void;
  onConfirm: (code: string) => void;
  isInvalid?: boolean;
  lang: SupportLanguage;
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
        {Label.인증버튼[lang]}
      </Button>
    </>
  );
}

const Label: { [key: string]: Translation } = {
  인증버튼: new Translation({
    zh: '点击认证',
    kr: '인증하기',
    en: 'Verify',
  }),
};
