import { Typography } from '@mui/material';

export default function TextError({ msg }: { msg: string }) {
  return (
    <Typography variant="caption" color="error" sx={{ textAlign: 'start', width: '100%' }}>
      {msg}
    </Typography>
  );
}
