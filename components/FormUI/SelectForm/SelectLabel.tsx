import { FormControlLabel } from '@mui/material';

interface SelectLabelProps {
  disabled: boolean;
  control: JSX.Element;
  label: JSX.Element;
}

function SelectLabel({ disabled, control, label }: SelectLabelProps) {
  return (
    <FormControlLabel
      sx={{
        '.MuiFormControlLabel-label': {
          flex: 1,
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

export default SelectLabel;
