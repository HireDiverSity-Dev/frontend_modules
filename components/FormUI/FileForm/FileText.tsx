import { Typography } from '@mui/material';
import { SupportLanguage, Translation } from 'fe-modules/models/lang';

interface FileTextProps {
  lang: SupportLanguage;
}

export default function FileText({ lang }: FileTextProps) {
  return <Typography sx={{ fontSize: '14px', color: '#909090', mt: 0.5, mb: 2 }}>{Label.유의사항[lang]}</Typography>;
}

const Label: { [key: string]: Translation } = {
  유의사항: new Translation({
    kr: 'jpg, jpeg, png 와 pdf 파일만 올릴 수 있습니다',
    zh: '只能上传 jpg、jpeg、png 和 pdf 文件',
    en: 'Only jpg, jpeg, png, and pdf files can be uploaded.',
  }),
};
