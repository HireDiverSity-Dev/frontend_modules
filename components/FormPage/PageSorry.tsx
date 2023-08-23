import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import FlexBox from 'fe-modules/components/basic/FlexBox';
import FormUI from 'fe-modules/components/FormUI/index';
import { Auth } from 'fe-modules/models/auth';
import { FormPageProps } from 'fe-modules/models/FormPage/FormPage';
import { FormUISetting } from 'fe-modules/models/FormUI/FormUI';
import { SupportLanguage } from 'fe-modules/models/lang';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

export default function PageSorry({ props, lang, auth }: { props: FormPageProps; lang: SupportLanguage; auth: Auth }) {
  const { t } = useTranslation('customForm');

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <>
      <FlexBox sx={{ width: '100%', height: '100%', justifyContent: 'space-between', flexDirection: 'column' }}>
        <Typography variant="subtitle1" sx={{ mt: 2, textAlign: 'center' }}>
          {props.title[lang]}
        </Typography>
        <FlexBox sx={{ mt: 6, justifyContent: 'space-between', width: '100%', flexDirection: 'column', gap: 2 }}>
          <FlexBox sx={{ justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="subtitle2">{t('신청기간아님.시작일')}</Typography>
            <Typography variant="body1">
              {props.startDate ? new Date(props.startDate).toLocaleString() : '-'}
            </Typography>
          </FlexBox>
          <FlexBox sx={{ justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="subtitle2">{t('신청기간아님.종료일')}</Typography>
            <Typography variant="body1">{props.endDate ? new Date(props.endDate).toLocaleString() : '-'}</Typography>
          </FlexBox>
        </FlexBox>
        <Box sx={{ width: '100%', flex: 1, mt: 4, textAlign: 'center' }}>
          {props.sorry?.data ? (
            <FormUI
              form={useForm()}
              uiSettings={props.forms}
              uiSetting={props.sorry as unknown as FormUISetting}
              lang={lang}
              auth={auth}
            />
          ) : (
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {t('신청기간아님.본문')}
            </Typography>
          )}
        </Box>
      </FlexBox>
    </>
  );
}
