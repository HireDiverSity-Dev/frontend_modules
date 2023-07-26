import { LinearProgress } from '@mui/material';

interface Props {
  page: number;
  endPage: number;
}

function PageProgress({ page, endPage }: Props) {
  return (
    <LinearProgress
      variant="determinate"
      value={((page - 1) / (endPage - 1)) * 100}
      sx={{
        height: 10,
      }}
    />
  );
}

export default PageProgress;
