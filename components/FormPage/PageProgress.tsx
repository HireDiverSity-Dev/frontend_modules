import { LinearProgress, linearProgressClasses } from '@mui/material';

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
        borderRadius: 5,
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
        },
      }}
    />
  );
}

export default PageProgress;
