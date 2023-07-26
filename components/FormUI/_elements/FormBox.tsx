import { SxProps } from '@mui/material';
import { Box } from '@mui/system';

function FormBox({ children, sx, id }: { children: React.ReactNode; sx?: SxProps; id?: string }) {
  return (
    <Box sx={{ ...sx, width: '100%', mt: 2, position: 'relative', p: 2 }} id={id}>
      {children}
    </Box>
  );
}

export default FormBox;
