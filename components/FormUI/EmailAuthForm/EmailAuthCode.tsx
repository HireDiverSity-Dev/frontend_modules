import { Button, TextField } from '@mui/material';
import { Translation } from 'fe-modules/models/lang';
import { Lang } from '@/types/user/UserType';

interface EmailAuthCodeProps {
  name: string;
  code: string;
  setCode: (code: string) => void;
  onConfirm: (code: string) => void;
  lang: Lang;
}

export default function EmailAuthCode({ name, code, setCode, onConfirm, lang }: EmailAuthCodeProps) {
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
        {Label.인증버튼[lang as keyof Translation]}
      </Button>
    </>
  );
}

const Label: { [key: string]: Translation } = {
  인증버튼: {
    zh: '请输入验证码',
    kr: '인증번호 입력',
    en: 'Enter code',
  },
};
