import { useEffect, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button } from '@mui/material';
import SetSetting from 'fe-modules/components/FormUI/SetSetting';
import { FormUISetting, FormUIUseFormReturn } from 'fe-modules/models/FormUI/FormUI';
import { useTranslation } from 'next-i18next';

interface Props {
  form: FormUIUseFormReturn;
  uiSettings: FormUISetting[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  endPage: number;
}

function prevPage({ page, setPage }: Props) {
  if (page > 1) {
    setPage(page - 1);
    window.scrollTo(0, 0);
  }
}

function nextPage({ page, setPage, endPage }: Props) {
  if (page < endPage) {
    setPage(page + 1);
    window.scrollTo(0, 0);
  }
}

function PageController(props: Props) {
  const { t } = useTranslation('customForm');
  const { form, uiSettings, page, endPage } = props;
  const [isFilled, setIsFilled] = useState(false);
  const newSettings = uiSettings.map((uiSetting) => {
    const newSetting = SetSetting(form, uiSetting);
    return newSetting;
  });

  useEffect(() => {
    setIsFilled(true);
    newSettings.map((newSetting) => {
      if (newSetting.page === page) {
        const value = form.watch(newSetting.formKey);
        console.log(newSetting.formKey, value);
        const { invalid } = form.getFieldState(newSetting.formKey);
        if (!newSetting.rule?.invisible) {
          if ((newSetting.rule?.required && value === undefined) || invalid) setIsFilled(false);
        }
      }
    });
  }, [page, uiSettings, form.watch()]);

  return (
    <div style={{ width: '100%', flex: 0, display: 'flex', justifyContent: 'space-between' }}>
      <Button disabled={page === 1} onClick={() => prevPage(props)}>
        <ChevronLeftIcon />
        {t('폼.페이지이동.이전')}
      </Button>
      <Button disabled={page === endPage || !isFilled} onClick={() => nextPage(props)}>
        {t('폼.페이지이동.다음')}
        <ChevronRightIcon />
      </Button>
    </div>
  );
}

export default PageController;
