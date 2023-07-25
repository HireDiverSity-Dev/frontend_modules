import { TextField } from '@mui/material';
import { ControllerFieldState, ControllerRenderProps, FieldValues } from 'react-hook-form';

interface TextInputProps {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState?: ControllerFieldState;
  disabled: boolean;
  multiline: boolean;
  onCustomChange?: (event: any) => void;
}
export default function TextInput({ field, fieldState, disabled, multiline, onCustomChange }: TextInputProps) {
  return (
    <TextField
      onChange={onCustomChange ?? field.onChange}
      onBlur={field.onBlur}
      value={field.value ?? ''}
      name={field.name}
      inputRef={field.ref}
      multiline={multiline}
      disabled={disabled}
      error={fieldState?.invalid ?? false}
      fullWidth
    />
  );
}
