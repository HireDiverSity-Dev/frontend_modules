import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import FlexBox from 'fe-modules/components/basic/FlexBox';

export default function PageLoading() {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  return (
    <>
      <FlexBox sx={{ width: '100vh', height: '100vh' }}>
        <CircularProgress />
      </FlexBox>
    </>
  );
}
