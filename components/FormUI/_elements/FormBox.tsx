import { SxProps } from '@mui/material';
import { Box } from '@mui/system';

function FormBox({ children, sx }: { children: React.ReactNode; sx?: SxProps }) {
  return <Box sx={{ ...sx, width: '100%', mt: 2, position: 'relative', p: 2 }}>{children}</Box>;
}

export default FormBox;
