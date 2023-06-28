import { Box, BoxProps } from '@mui/material';

function FlexBox({ sx, ...props }: BoxProps) {
  return <Box {...props} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ...sx }} />;
}

export default FlexBox;
