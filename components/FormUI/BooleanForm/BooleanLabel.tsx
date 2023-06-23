import { ChangeEvent } from 'react';
import { FormControlLabel, Radio, Typography } from '@mui/material';

interface BooleanLabelProps {
  type: boolean;
  isHorizontal: boolean;
  isDisabled: boolean;
  control: JSX.Element;
  label: JSX.Element;
}

function BooleanLabel({ type, isHorizontal, isDisabled, control, label }: BooleanLabelProps) {
  const verticalStyle = {
    '.MuiFormControlLabel-label': {
      flex: 1,
    },
    mb: '0.5rem',
    display: 'flex',
    alignItems: 'start',
    width: '100%',
  };

  return (
    <FormControlLabel
      value={type}
      control={control}
      label={label}
      sx={!isHorizontal ? verticalStyle : undefined}
      disabled={isDisabled}
    />
  );
}

export default BooleanLabel;
