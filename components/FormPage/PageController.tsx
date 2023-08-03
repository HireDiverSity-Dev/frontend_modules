import { useEffect, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button } from '@mui/material';
import isMovable from 'fe-modules/components/FormPage/isMovable';
import { getNewUiSettingsObject } from 'fe-modules/components/FormUI/_checkFormUI/getUiSettings';
import isConditionSatisfied from 'fe-modules/components/FormUI/_checkFormUI/isConditionSatisfied';
import { FormUISetting, FormUIUseFormReturn } from 'fe-modules/models/FormUI/FormUI';
import { FormUICondition } from 'fe-modules/models/FormUI/FormUICondition';
import { useTranslation } from 'next-i18next';

interface Props {
  form: FormUIUseFormReturn;
  uiSettings: FormUISetting[];
  pageConditions: Array<FormUICondition> | undefined | null;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  endPage: number;
}

export function prevPage({ form, page, setPage }: Props) {
  if (page > 1) {
    const pageHistory = form.getValues('pageHistory') ?? [];
    if (pageHistory.length > 0) {
      const pageDestination = pageHistory.pop();
      form.setValue('pageHistory', pageHistory);
      if (pageDestination !== undefined) {
        setPage(pageDestination);
        window.scrollTo(0, 0);
        return;
      }
    }
  }
}

export function nextPage({ form, uiSettings, pageConditions, page, setPage, endPage }: Props) {
  let canMoveNext = true;
  for (let i = 0; i < uiSettings.length; i += 1) {
    const setting = uiSettings[i];
    if (setting.page !== page) continue;
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
    // page history 저장
    const pageHistory = (form.getValues('pageHistory') as number[]) ?? [];
    pageHistory.push(page);
    form.setValue('pageHistory', pageHistory);

    // 다음 페이지 계산
    const uiSettingsObject = getNewUiSettingsObject(form, uiSettings);
    let pageDestination = page + 1;
    pageConditions?.forEach((condition) => {
      const satisfied = isConditionSatisfied(form, uiSettingsObject, condition.triggers); // 조건 충족할 경우 액션 처리
      if (satisfied && condition.action.action === 'setNextPage') {
        const parsedPage = parseInt(condition.action.val ?? '');
        if (!isNaN(parsedPage)) {
          pageDestination = parsedPage;
        }
      }
    });
    console.log(pageDestination);

    // 다음 페이지로 이동
    setPage(pageDestination);
    window.scrollTo(0, 0);
  }
}

function PageController(props: Props) {
  const { t } = useTranslation('customForm');
  const { form, uiSettings, pageConditions, page, endPage } = props;

  const newUiSettings = uiSettings.filter((uiSetting) => uiSetting.page === page);

  const [canMoveNext, setCanMoveNext] = useState(false);
  useEffect(() => {
    const uiSettingsObject = getNewUiSettingsObject(form, uiSettings);
    const tempMoveNext = isMovable(form, uiSettingsObject, pageConditions);
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
        onClick={() => nextPage({ ...props, uiSettings: newUiSettings })}
      >
        {t('폼.페이지이동.다음')}
        <ChevronRightIcon />
      </Button>
    </div>
  );
}

export default PageController;
