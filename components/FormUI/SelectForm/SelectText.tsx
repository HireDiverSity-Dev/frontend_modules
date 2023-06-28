import { Typography } from '@mui/material';

function SelectText({ msg }: { msg: string }) {
  return (
    <Typography variant="body1" sx={{ fontSize: '1.2rem', p: '0.4rem' }}>
      {msg}
    </Typography>
  );
}

export default SelectText;
