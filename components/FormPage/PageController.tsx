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

function nextPage({ form, uiSettings, page, setPage, endPage }: Props) {
  let canMoveNext = true;
  for (let i = 0; i < uiSettings.length; i += 1) {
    const setting = uiSettings[i];
    const value = form.watch(setting.FormItem_id);
    const { invalid } = form.getFieldState(setting.FormItem_id);
    if (!setting.rule?.invisible) {
      if ((setting.rule?.required && (value === undefined || value?.length === 0)) || invalid) {
        const target = document.getElementById(setting.FormItem_id);
        const clientRect = target?.getBoundingClientRect();
        const relativeTop = clientRect?.top;
        const scrolledTopLength = window.scrollY;
        const absoluteTop = scrolledTopLength + (relativeTop ?? 0);
        window.scrollTo(0, absoluteTop - 50);
        form.setFocus(setting.FormItem_id);
        form.setError(setting.FormItem_id, { type: 'required' });
        canMoveNext = false;
        return;
      }
    }
  }

  if (canMoveNext && page < endPage) {
    setPage(page + 1);
    window.scrollTo(0, 0);
  }
}

function PageController(props: Props) {
  const { t } = useTranslation('customForm');
  const { form, uiSettings, pageConditions, page, endPage } = props;
  const watch = useWatch({ control: form.control });

  const newSettings = uiSettings
    .filter((uiSetting) => uiSetting.page === page)
    .map((uiSetting) => {
      const newSetting = getNewSetting(uiSetting, watch);
      return newSetting;
    });

  const [canMoveNext, setCanMoveNext] = useState(false);
  useEffect(() => {
    const tempMoveNext = isMovable(pageConditions, watch);
    setCanMoveNext(tempMoveNext);
  }, [pageConditions, form.watch()]);

  return (
    <div style={{ width: '100%', flex: 0, display: 'flex', justifyContent: 'space-between' }}>
      <Button disabled={page === 1} onClick={() => prevPage(props)}>
        <ChevronLeftIcon />
        {t('폼.페이지이동.이전')}
      </Button>
      <Button
        disabled={page === endPage || !canMoveNext}
        onClick={() => nextPage({ ...props, uiSettings: newSettings })}
      >
        {t('폼.페이지이동.다음')}
        <ChevronRightIcon />
      </Button>
    </div>
  );
}

export default PageController;
