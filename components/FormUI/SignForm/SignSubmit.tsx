import { Lang, Translation } from 'fe-modules/models/lang';
import { Button } from '@mui/material';

const SignatureClearLabel = {
  clear: {
    kr: 'clear',
    zh: '擦除',
    en: 'clear',
  },
};

interface SignSubmitProps {
  lang: Lang;
  onClick: () => void;
}

export default function SignSubmit({ lang, onClick }: SignSubmitProps) {
  return (
    <Button sx={{ float: 'right', color: 'grey' }} onClick={onClick}>
      {SignatureClearLabel.clear[lang as keyof Translation]}
    </Button>
  );
}
