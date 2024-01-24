import { useEffect, useState } from 'react';
import getDefaultData from 'fe-modules/components/FormPage/getDefaultData';
import isFormDeployed from 'fe-modules/components/FormPage/isFormDeployed';
import PageBody from 'fe-modules/components/FormPage/PageBody';
import PageLoading from 'fe-modules/components/FormPage/PageLoading';
import PageSorry from 'fe-modules/components/FormPage/PageSorry';
import PageSorryButton from 'fe-modules/components/FormPage/PageSorryButton';
import PageThankyou from 'fe-modules/components/FormPage/PageThankyou';
import { Auth } from 'fe-modules/models/auth';
import { FormPageProps } from 'fe-modules/models/FormPage/FormPage';
import { FormUIValues } from 'fe-modules/models/FormUI/FormUIValue';
import { SupportLanguage } from 'fe-modules/models/lang';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

function FormPage({ props, auth }: { props: FormPageProps; auth: Auth }) {
  const { i18n } = useTranslation(['customForm', 'form', 'common']);
  const lang = i18n.language as SupportLanguage;

  // let savedValues: any = {};
  // if (typeof window !== 'undefined') savedValues = JSON.parse(localStorage.getItem(props._id) ?? '{}');

  const form = useForm<FormUIValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    // defaultValues: savedValues,
  });
  // useEffect(() => {
  //   localStorage.setItem(props._id, JSON.stringify(form.getValues()));
  // }, [form.watch()]);

  useEffect(() => {
    // getDefaultData(props, savedValues).then((defaultData) => {
    //   form.reset(defaultData);
    //   setIsLoaded(true);
    // });
    setIsLoaded(true);
  }, []);

  const [isDeployed] = useState(isFormDeployed(props));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      {isDeployed ? (
        isSubmitted ? (
          <PageThankyou props={props} auth={auth} lang={lang} />
        ) : isLoaded ? (
          <PageBody props={props} form={form} auth={auth} lang={lang} setIsSubmitted={setIsSubmitted} />
        ) : (
          <PageLoading />
        )
      ) : (
        <>
          <PageSorry props={props} lang={lang} auth={auth} />
          {props.sorry?.isUseButton && <PageSorryButton props={props} lang={lang} />}
        </>
      )}
    </>
  );
}

export default FormPage;
