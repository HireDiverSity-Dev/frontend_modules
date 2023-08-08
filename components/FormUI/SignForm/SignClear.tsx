import { Button } from '@mui/material';
import { SupportLanguage, Translation } from 'fe-modules/models/lang';

const SignatureClearLabel: { clear: Translation } = {
  clear: new Translation({
    kr: 'clear',
    zh: '擦除',
    en: 'clear',
  }),
};

interface SignSubmitProps {
  lang: SupportLanguage;
  onClick: () => void;
}

export default function SignClear({ lang, onClick }: SignSubmitProps) {
  return (
    <Button sx={{ width: '100%', color: 'grey' }} onClick={onClick}>
      {SignatureClearLabel.clear[lang]}
    </Button>
  );
}
