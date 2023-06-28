import { Radio } from '@mui/material';

interface BoolearnRadioProps {
  value: boolean;
  curValue: boolean;
  onChange: (value: boolean) => void;
}

function BoolearnRadio({ value, curValue, onChange }: BoolearnRadioProps) {
  return (
    <Radio
      sx={{
        '& .MuiSvgIcon-root': {
          fontSize: '1.8rem',
        },
      }}
      checked={curValue === value}
      onChange={() => onChange(value)}
    />
  );
}

export default BoolearnRadio;
