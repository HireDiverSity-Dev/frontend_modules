import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import PageController from 'fe-modules/components/FormPage/PageController';
import PageProgress from 'fe-modules/components/FormPage/PageProgress';
import FormSubmitButton from 'fe-modules/components/FormPage/submit/SubmitButton';
import FormUI from 'fe-modules/components/FormUI/index';
import { Auth } from 'fe-modules/models/auth';
import { FormPageProps } from 'fe-modules/models/FormPage/FormPage';
import { FormUISetting, FormUIUseFormReturn } from 'fe-modules/models/FormUI/FormUI';
import { SupportLanguage } from 'fe-modules/models/lang';

function getEndPage(forms: Array<FormUISetting>): number {
  return forms[forms.length - 1].page;
}

interface Props {
  props: FormPageProps;
  form: FormUIUseFormReturn;
  auth: Auth;
  lang: SupportLanguage;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PageBody({ props, auth, form, lang, setIsSubmitted }: Props) {
  const [page, setPage] = useState(1);
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          width: '100%',
          top: 48,
          zIndex: 40,
          alignItems: 'center',
        }}
      >
        <PageProgress page={page} endPage={getEndPage(props.forms)} />
      </Box>
      <Box sx={{ width: '100%' }}>
        <Typography variant="subtitle1" sx={{ my: 2, textAlign: 'center' }}>
          {props.title[lang]}
        </Typography>
        <Box sx={{ width: '100%', flex: 1 }}>
          {props.forms.map((uiSetting, index) => {
            if (uiSetting.page === page)
              return (
                <FormUI
                  form={form}
                  uiSettings={props.forms}
                  uiSetting={uiSetting}
                  lang={lang}
                  auth={auth}
                  key={index}
                />
              );
          })}
        </Box>
        {getEndPage(props.forms) === page ? (
          <FormSubmitButton form={form} page={props} auth={auth} setIsSubmitted={setIsSubmitted} />
        ) : (
          <></>
        )}
        <PageController
          form={form}
          uiSettings={props.forms}
          pageConditions={props.pages?.[page]?.conditions}
          page={page}
          setPage={setPage}
          endPage={getEndPage(props.forms)}
        />
      </Box>
    </>
  );
}
