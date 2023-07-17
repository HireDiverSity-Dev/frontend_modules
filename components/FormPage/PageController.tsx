import { useEffect, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button } from '@mui/material';
import isMovable from 'fe-modules/components/FormPage/isMovable';
import getNewSetting from 'fe-modules/components/FormUI/_checkFormUI/getNewSetting';
import { FormUISetting, FormUIUseFormReturn } from 'fe-modules/models/FormUI/FormUI';
import { FormUICondition } from 'fe-modules/models/FormUI/FormUICondition';
import { useTranslation } from 'next-i18next';
import { useWatch } from 'react-hook-form';

interface Props {
  form: FormUIUseFormReturn;
  uiSettings: FormUISetting[];
  pageConditions: Array<FormUICondition> | undefined;
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
  const { form, uiSettings, pageConditions, page, endPage } = props;
  const watch = useWatch({ control: form.control });

  const newSettings = uiSettings.map((uiSetting) => {
    const newSetting = getNewSetting(uiSetting, watch);
    return newSetting;
  });

  const [canMoveNext, setCanMoveNext] = useState(false);
  useEffect(() => {
    const tempMoveNext = isMovable(
      form,
      newSettings.filter((newSetting) => newSetting.page === page),
      pageConditions,
      watch,
    );
    setCanMoveNext(tempMoveNext);
  }, [page, uiSettings, pageConditions, form.watch()]);

  return (
    <div style={{ width: '100%', flex: 0, display: 'flex', justifyContent: 'space-between' }}>
      <Button disabled={page === 1} onClick={() => prevPage(props)}>
        <ChevronLeftIcon />
        {t('폼.페이지이동.이전')}
      </Button>
      <Button disabled={page === endPage || !canMoveNext} onClick={() => nextPage(props)}>
        {t('폼.페이지이동.다음')}
        <ChevronRightIcon />
      </Button>
    </div>
  );
}

export default PageController;
