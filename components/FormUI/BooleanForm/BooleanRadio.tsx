import { Radio } from '@mui/material';

interface BoolearnRadioProps {
  type: boolean;
  curValue: boolean;
  onChange: (value: boolean) => void;
}

function BoolearnRadio({ type, curValue, onChange }: BoolearnRadioProps) {
  return (
    <Radio
      sx={{
        '& .MuiSvgIcon-root': {
          fontSize: '1.8rem',
        },
      }}
      checked={curValue === type}
      onChange={() => onChange(type)}
    />
  );
}

export default BoolearnRadio;
