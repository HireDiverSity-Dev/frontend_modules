import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import PageController from 'fe-modules/components/FormPage/PageController';
import PageProgress from 'fe-modules/components/FormPage/PageProgress';
import FormSubmitButton from 'fe-modules/components/FormPage/submit/SubmitButton';
import FormUI from 'fe-modules/components/FormUI';
import { Auth } from 'fe-modules/models/auth';
import { FormPageProps } from 'fe-modules/models/FormPage/FormPage';
import { FormUISetting } from 'fe-modules/models/FormUI/FormUI';
import { Lang } from 'fe-modules/models/lang';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

function getEndPage(forms: Array<FormUISetting>): number {
  return forms[forms.length - 1].page;
}

function FormPage({ props, auth }: { props: FormPageProps; auth: Auth }) {
  const { i18n } = useTranslation(['customForm', 'form', 'common']);
  let savedValues: any = {};
  if (typeof window !== 'undefined') savedValues = JSON.parse(localStorage.getItem(props._id) ?? '{}');

  const form = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: savedValues,
  });
  const { getValues, reset } = form;

  const [page, setPage] = useState(1);

  useEffect(() => {
    localStorage.setItem(props._id, JSON.stringify(getValues()));
  }, [form.watch()]);

  // Todo: 함수 분리
  useEffect(() => {
    // 프리필 항목 설정: url query 로 들어오는 값 추가 -> 기본 세팅값 추가 -> undefined 순
    let newDefaultValues: any = { ...savedValues };
    newDefaultValues.saveDir = props.directory;

    const preFills = new URLSearchParams(location.search);
    console.log(preFills);

    props.forms.forEach((formUI) => {
      const _id = formUI.FormItem_id;
      const encodedKeys: string[] = [
        formUI.FormItem_id,
        encodeURIComponent(formUI.FormItem_id),
        formUI.FormItem_id.replace(/[(]/g, '%28').replace(/[)]/g, '%29'),
      ];

      if (newDefaultValues[_id] !== undefined) return; // 1순위 : 자동저장된 값
      for (let key of encodedKeys) {
        // 2순위 : url로 들어오는 값
        if (preFills.get(key) && typeof preFills.get(key) !== null) {
          newDefaultValues[key] = decodeURIComponent(preFills.get(key) as string);
          return;
        }
      }
      newDefaultValues[_id] = formUI.defaultValue; // 3순위 : 기본값
    });

    reset(newDefaultValues);
  }, []);

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
          {props.title[i18n.language as Lang]}
        </Typography>
        <Box sx={{ width: '100%', flex: 1 }}>
          {props.forms.map((uiSetting, index) => {
            if (uiSetting.page === page)
              return <FormUI form={form} uiSetting={uiSetting} lang={i18n.language as Lang} auth={auth} key={index} />;
          })}
        </Box>
        {getEndPage(props.forms) === page ? <FormSubmitButton form={form} page={props} auth={auth} /> : <></>}
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

export default FormPage;
