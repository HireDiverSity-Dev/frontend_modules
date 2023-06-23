import { Typography } from '@mui/material';

function FormError({ msg }: { msg: string }) {
  return (
    <Typography variant="body2" mb={2}>
      <p style={{ color: 'red' }}>{msg}</p>
    </Typography>
  );
}

export default FormError;
