import { LinearProgress } from '@mui/material';
import FlexBox from '../basic/FlexBox';

interface Props {
  page: number;
  endPage: number;
}

function PageProgress({ page, endPage }: Props) {
  const progressPercent = ((page - 1) / endPage) * 100;
  return (
    <FlexBox sx={{ width: '100%', gap: 5, alignItems: 'center', justifyContent: 'space-between' }}>
      <LinearProgress
        variant="determinate"
        value={progressPercent}
        sx={{
          flex: 1,
          height: 20,
        }}
      />
      <Typography sx={{ mr: 3 }}>{`${progressPercent}%`}</Typography>
    </FlexBox>
}

export default PageProgress;
