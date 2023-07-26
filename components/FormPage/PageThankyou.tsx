import { Box, Typography } from '@mui/material';
import { FormPageProps } from 'fe-modules/models/FormPage/FormPage';
import { Lang } from 'fe-modules/models/lang';

export default function PageThankyou({ props, lang }: { props: FormPageProps; lang: Lang }) {
  scrollTo(0, 0);
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Typography variant="subtitle1" sx={{ my: 2, textAlign: 'center' }}>
          {props.title[lang]}
        </Typography>
        <Box sx={{ width: '100%', flex: 1, my: 2, textAlign: 'center' }}>Submit Success</Box>
      </Box>
    </>
  );
}
