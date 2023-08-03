import { TextField } from '@mui/material';
import { ControllerFieldState, ControllerRenderProps, FieldValues } from 'react-hook-form';

interface TextInputProps {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState?: ControllerFieldState;
  placeholder?: string;
  disabled?: boolean;
  multiline?: boolean;
  onCustomChange?: (event: any) => void;
}
export default function TextInput({
  field,
  fieldState,
  placeholder,
  disabled,
  multiline,
  onCustomChange,
}: TextInputProps) {
  return (
    <TextField
      onChange={onCustomChange ?? field.onChange}
      onBlur={field.onBlur}
      value={field.value ?? ''}
      placeholder={placeholder ?? ''}
      name={field.name}
      inputRef={field.ref}
      multiline={multiline ?? false}
      disabled={disabled ?? false}
      error={fieldState?.invalid ?? false}
      fullWidth
    />
  );
}
