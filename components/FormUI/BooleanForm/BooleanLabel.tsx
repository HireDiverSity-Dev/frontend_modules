import { FormControlLabel } from '@mui/material';

interface BooleanLabelProps {
  value: boolean;
  isHorizontal: boolean;
  disabled: boolean;
  control: JSX.Element;
  label: JSX.Element;
}

function BooleanLabel({ value, isHorizontal, disabled, control, label }: BooleanLabelProps) {
  return (
    <FormControlLabel
      value={value}
      control={control}
      label={label}
      sx={!isHorizontal ? verticalStyle : undefined}
      disabled={disabled}
    />
  );
}

const verticalStyle = {
  '.MuiFormControlLabel-label': {
    flex: 1,
  },
  mb: '0.5rem',
  display: 'flex',
  alignItems: 'start',
  width: '100%',
};

export default BooleanLabel;
