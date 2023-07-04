import { Box, BoxProps } from '@mui/material';

function GridBox({ sx, ...props }: BoxProps) {
  return <Box {...props} sx={{ display: 'grid', justifyContent: 'space-between', alignItems: 'center', ...sx }} />;
}

export default GridBox;
