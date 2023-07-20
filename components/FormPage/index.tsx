import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import PageController from 'fe-modules/components/FormPage/PageController';
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

  const form = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { getValues, reset } = form;

  const [page, setPage] = useState(1);
  // Todo: any 타입 제거
  const [defaultValues, setDefaultValues] = useState<any>({});

  useEffect(() => {
    const AutoSaveForm = () => {
      localStorage.setItem(props.path, JSON.stringify(getValues()));
      console.log('임시 저장 완료');
    };
    const id = setInterval(AutoSaveForm, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  // Todo: 함수 분리
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('form') ?? '{}');
    const preFills = new URLSearchParams(location.search);

    // 프리필 항목 설정: 자동저장 불러오기 -> url query -> 기본 세팅값 -> undefined 순
    let newDefaultValues: any = {};
    props.forms.forEach((formUI) => {
      // url encode 여부 확인
      const keys: string[] = [
        formUI.formKey,
        encodeURIComponent(formUI.formKey),
        formUI.formKey.replace(/[(]/g, '%28').replace(/[)]/g, '%29'),
      ];

      let defaultValue = saved[keys[0]]
        ? saved[keys[0]] // 자동저장된 값
        : preFills.get(keys[0]) && typeof preFills.get(keys[0]) !== null // url로 지정된 값
        ? decodeURIComponent(preFills.get(keys[0]) as string)
        : preFills.get(keys[1]) && typeof preFills.get(keys[1]) !== null
        ? decodeURIComponent(preFills.get(keys[1]) as string)
        : preFills.get(keys[2]) && typeof preFills.get(keys[2]) !== null
        ? decodeURIComponent(preFills.get(keys[2]) as string)
        : formUI.defaultValue; // 폼 설정 시 default로 설정한 값
      newDefaultValues[keys[0]] = defaultValue;
    });

    setDefaultValues(newDefaultValues);
    reset(defaultValues, {
      keepValues: true,
    });
  }, []);

  // 프리필
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <>
      <Typography variant="subtitle1" sx={{ mb: 2, textAlign: 'center' }}>
        {props.title[i18n.language as Lang]}
      </Typography>
      <Box sx={{ width: '100%', flex: 1 }}>
        {props.forms.map((uiSetting, index) => {
          if (uiSetting.page === page)
            return <FormUI form={form} uiSetting={uiSetting} lang={i18n.language as Lang} auth={auth} key={index} />;
        })}
      </Box>
      <PageController
        form={form}
        uiSettings={props.forms}
        pageConditions={props.pages?.[page]?.conditions}
        page={page}
        setPage={setPage}
        endPage={getEndPage(props.forms)}
      />
      {getEndPage(props.forms) === page ? <FormSubmitButton form={form} page={props} auth={auth} /> : <></>}
    </>
  );
}

export default FormPage;
