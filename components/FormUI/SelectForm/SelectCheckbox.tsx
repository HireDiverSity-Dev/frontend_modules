import { Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

interface SelectCheckboxProps {
  value: number;
  isChecked: boolean;
  multiple: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SelectCheckbox({ value, isChecked, multiple, onChange }: SelectCheckboxProps) {
  return (
    <Checkbox
      value={value}
      icon={multiple ? <CheckBoxOutlineBlankIcon /> : <RadioButtonUncheckedIcon />}
      checkedIcon={multiple ? <CheckBoxIcon /> : <RadioButtonCheckedIcon />}
      checked={isChecked}
      onChange={onChange}
    />
  );
}
