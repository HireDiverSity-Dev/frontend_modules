import { FormControlLabel } from '@mui/material';

interface CheckboxLabelProps {
  disabled: boolean;
  control: JSX.Element;
  label: JSX.Element;
}

function CheckboxLabel({ disabled, control, label }: CheckboxLabelProps) {
  return (
    <FormControlLabel
      sx={{
        '.MuiFormControlLabel-label': {
          flex: 1,
          my: 'auto',
        },
        mb: '0.5rem',
        display: 'flex',
        alignItems: 'start',
      }}
      control={control}
      label={label}
      disabled={disabled}
    />
  );
}

export default CheckboxLabel;
