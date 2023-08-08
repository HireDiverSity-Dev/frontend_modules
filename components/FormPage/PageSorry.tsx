import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import FlexBox from 'fe-modules/components/basic/FlexBox';
import { FormPageProps } from 'fe-modules/models/FormPage/FormPage';
import { SupportLanguage } from 'fe-modules/models/lang';

export default function PageSorry({ props, lang }: { props: FormPageProps; lang: SupportLanguage }) {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Typography variant="subtitle1" sx={{ mt: 2, textAlign: 'center' }}>
          {props.title[lang]}
        </Typography>
        <Box sx={{ width: '100%', flex: 1, mt: 4, textAlign: 'center' }}>
          <Typography variant="body1">
            This form is not application period. Please check the application period.
          </Typography>
        </Box>
        <FlexBox sx={{ mt: 20, justifyContent: 'center', gap: 8, flexDirection: 'column' }}>
          <Box textAlign="center">
            <Typography variant="subtitle2">Start Date</Typography>
            <Typography variant="body1" mt={2}>
              {props.startDate ? new Date(props.startDate).toLocaleString() : '-'}
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="subtitle2">End Date</Typography>
            <Typography variant="body1" mt={2}>
              {props.endDate ? new Date(props.endDate).toLocaleString() : '-'}
            </Typography>
          </Box>
        </FlexBox>
      </Box>
    </>
  );
}
