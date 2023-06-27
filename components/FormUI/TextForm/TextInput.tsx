import { TextField } from '@mui/material';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface TextInputProps {
  field: ControllerRenderProps<FieldValues, string>;
  disabled: boolean;
  multiline: boolean;
  onCustomChange?: (event: any) => void;
}
export default function TextInput({ field, disabled, multiline, onCustomChange }: TextInputProps) {
  return (
    <TextField
      onChange={onCustomChange ?? field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      name={field.name}
      inputRef={field.ref}
      multiline={multiline}
      disabled={disabled}
      fullWidth
    />
  );
}
