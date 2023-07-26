import { useEffect, useState } from 'react';
import getDefaultData from 'fe-modules/components/FormPage/getDefaultData';
import isFormDeployed from 'fe-modules/components/FormPage/isFormDeployed';
import PageBody from 'fe-modules/components/FormPage/PageBody';
import PageSorry from 'fe-modules/components/FormPage/PageSorry';
import PageThankyou from 'fe-modules/components/FormPage/PageThankyou';
import { Auth } from 'fe-modules/models/auth';
import { FormPageProps } from 'fe-modules/models/FormPage/FormPage';
import { Lang } from 'fe-modules/models/lang';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

function FormPage({ props, auth }: { props: FormPageProps; auth: Auth }) {
  const { i18n } = useTranslation(['customForm', 'form', 'common']);
  const lang = i18n.language as Lang;

  let savedValues: any = {};
  if (typeof window !== 'undefined') savedValues = JSON.parse(localStorage.getItem(props._id) ?? '{}');

  const form = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: savedValues,
  });
  useEffect(() => {
    localStorage.setItem(props._id, JSON.stringify(form.getValues()));
  }, [form.watch()]);

  useEffect(() => {
    const defaultData = getDefaultData(props, savedValues);
    form.reset(defaultData);
  }, []);

  const [isDeployed] = useState(isFormDeployed(props));
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <>
      {isDeployed ? (
        isSubmitted ? (
          <PageThankyou props={props} lang={lang} />
        ) : (
          <PageBody props={props} form={form} auth={auth} lang={lang} setIsSubmitted={setIsSubmitted} />
        )
      ) : (
        <PageSorry props={props} lang={lang} />
      )}
    </>
  );
}

export default FormPage;
