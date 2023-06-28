import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Lang, Translation } from '@/models/lang';

interface FileBrowseProps {
  lang: Lang;
  onClick: () => void;
}

export default function FileBrowse({ lang, onClick }: FileBrowseProps) {
  return (
    <Box onClick={onClick} sx={styles.container}>
      <CloudUploadIcon fontSize="large" />
      <Typography>{Label.파일찾기[lang as keyof Translation]}</Typography>
    </Box>
  );
}

const Label: { [key: string]: Translation } = {
  파일찾기: {
    kr: '파일 선택',
    zh: '浏览文件',
    en: 'Browse Files',
  },
};

const styles = {
  container: {
    width: '100%',
    aspectRatio: '5/2',
    backgroundColor: '#f2f2f2',
    border: '2px dashed #cecece',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
