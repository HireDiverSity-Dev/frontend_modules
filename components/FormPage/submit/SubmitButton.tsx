import { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import getRedirect from 'fe-modules/components/FormPage/submit/getRedirect';
import isReady from 'fe-modules/components/FormPage/submit/isReady';
import onSubmitForm from 'fe-modules/components/FormPage/submit/onSubmitForm';
import SubmitModal from 'fe-modules/components/FormPage/submit/SubmitModal';
import { useModal } from 'fe-modules/hooks/useModal';
import { Auth } from 'fe-modules/models/auth';
import { FormPageProps } from 'fe-modules/models/FormPage/FormPage';
import { FormUIUseFormReturn } from 'fe-modules/models/FormUI/FormUI';
import { SupportLanguage } from 'fe-modules/models/lang';
import { useTranslation } from 'next-i18next';

interface Props {
  form: FormUIUseFormReturn;
  page: FormPageProps;
  auth: Auth;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

function FormSubmitButton({ form, page, auth, setIsSubmitted }: Props) {
  const { t, i18n } = useTranslation(['customForm', 'form', 'common']);
  const { openModal } = useModal();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, formState, reset, watch } = form;

  const submitSuccess = async () => {
    setLoading(true);
    const curData = watch();
    try {
      const res = await onSubmitForm(curData, page, auth);
      if (res.status !== 200) throw new Error(res.data?.message);
      if (res.data.statusCode !== 200) throw new Error('Error occured while submitting ' + res.data?.body?.error);
      localStorage.removeItem(page.path);
      const onRedirect = getRedirect(curData, page);
      openModal(<SubmitModal onClick={onRedirect} preset="성공" translation={t} />, { width: '60%' }, onRedirect);
      setIsSubmitted(true);
    } catch (error: any) {
      console.error(error);
      openModal(<SubmitModal preset="실패" translation={t} />, { width: '60%' });
    }
    reset(curData, {
      keepDefaultValues: true,
    });
    setLoading(false);
  };

  const buttonContent = loading ? (
    <CircularProgress />
  ) : page.submit ? (
    page.submit.label[i18n.language as SupportLanguage]
  ) : (
    t(`버튼`)
  );

  return (
    <Button
      variant="contained"
      sx={{ width: '100%', my: 3, display: isReady(page.submit.conditions, watch) ? 'none' : undefined }}
      disabled={!formState.isValid || loading}
      onClick={async (e) => {
        console.log('[Submissions]\n', form.watch());
        console.log('[Settings]\n', page.forms);

        return handleSubmit(submitSuccess, () => {
          console.log('submit failed');
          console.log(formState.errors);
        })(e);
      }}
    >
      {buttonContent}
    </Button>
  );
}

export default FormSubmitButton;
