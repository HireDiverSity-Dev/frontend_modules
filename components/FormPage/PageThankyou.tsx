import { Box, Typography } from '@mui/material';
import FormUI from 'fe-modules/components/FormUI/index';
import { Auth } from 'fe-modules/models/auth';
import { FormPageProps } from 'fe-modules/models/FormPage/FormPage';
import { SupportLanguage } from 'fe-modules/models/lang';
import { useForm } from 'react-hook-form';

export default function PageThankyou({
  props,
  lang,
  auth,
}: {
  props: FormPageProps;
  lang: SupportLanguage;
  auth: Auth;
}) {
  scrollTo(0, 0);
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Typography variant="subtitle1" sx={{ my: 2, textAlign: 'center' }}>
          {props.title[lang]}
        </Typography>
        {props.submit.FormItem_id !== undefined ? (
          <FormUI form={useForm()} uiSettings={props.forms} uiSetting={props.submit} lang={lang} auth={auth} />
        ) : (
          <Box sx={{ width: '100%', flex: 1, my: 2, textAlign: 'center' }}>Submit Success</Box>
        )}
      </Box>
    </>
  );
}
