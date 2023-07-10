import { Box, Typography } from '@mui/material';

function FormError({ msg }: { msg: string }) {
  return (
    <Typography variant="body2" color="red" mb={2}>
      {msg}
    </Typography>
  );
}

export default FormError;
