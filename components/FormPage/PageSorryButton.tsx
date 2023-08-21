import { Box, Button } from '@mui/material';
import { FormPageProps } from 'fe-modules/models/FormPage/FormPage';
import { SupportLanguage } from 'fe-modules/models/lang';

export default function PageSorryButton({ props, lang }: { props: FormPageProps; lang: SupportLanguage }) {
  return (
    <>
      <Box sx={{ width: '100%', mb: 8 }}>
        <Button
          variant="contained"
          sx={{ width: '100%', fontWeight: 'bold' }}
          onClick={() => {
            window.open(props.sorry?.button?.redirect?.[lang] ?? 'https://hirevisa.plus/honey_tip_rc_issuance_process');
          }}
        >
          {props.sorry?.button?.label?.[lang] ?? 'Go to view RC issuance process'}
        </Button>
      </Box>
    </>
  );
}
