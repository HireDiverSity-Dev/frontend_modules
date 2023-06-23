import { Box } from '@mui/system';

function FormBox({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        width: '100%',
        mt: 2,
        position: 'relative',
        p: 2,
      }}
    >
      {children}
    </Box>
  );
}

export default FormBox;
