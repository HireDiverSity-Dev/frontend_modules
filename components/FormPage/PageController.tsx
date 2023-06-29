import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button } from '@mui/material';
import { useTranslation } from 'next-i18next';

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  endPage: number;
}

function prevPage({ page, setPage }: Props) {
  if (page > 1) {
    setPage(page - 1);
  }
}

function nextPage({ page, setPage, endPage }: Props) {
  if (page < endPage) {
    setPage(page + 1);
  }
}

function PageController(props: Props) {
  const { t } = useTranslation('customForm');
  const { page, endPage } = props;
  return (
    <div style={{ width: '100%', flex: 0, display: 'flex', justifyContent: 'space-between' }}>
      <Button disabled={page === 1} onClick={() => prevPage(props)}>
        <ChevronLeftIcon />
        {t('폼.페이지이동.이전')}
      </Button>
      <Button disabled={page === endPage} onClick={() => nextPage(props)}>
        {t('폼.페이지이동.다음')}
        <ChevronRightIcon />
      </Button>
    </div>
  );
}

export default PageController;
