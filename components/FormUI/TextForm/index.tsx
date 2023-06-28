import { useEffect } from 'react';
import { useController } from 'react-hook-form';
import { FormUIProps } from '@/models/FormUI/FormUI';
import FlexBox from '@/components/basic/FlexBox';
import TextInput from '@/components/FormUI/TextForm/TextInput';
import TextError from '@/components/FormUI/TextForm/TextError';

function TextForm({ form, uiSetting, lang, multiline }: FormUIProps & { multiline?: boolean }) {
  let { field, fieldState } = useController({
    name: uiSetting.formKey,
    control: form.control,
    rules: {
      required: uiSetting.rule?.required,
      pattern: uiSetting.data.pattern && {
        value: uiSetting.data.pattern.value,
        message: uiSetting.data.pattern.message,
      },
    },
  });

  useEffect(() => {
    if (uiSetting.rule?.default && uiSetting.defaultValue != undefined) {
      field.onChange(uiSetting.defaultValue);
    }
  }, [uiSetting.rule?.default, uiSetting.defaultValue]);

  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100' }}>
      <TextInput field={field} multiline={multiline ?? false} disabled={uiSetting.rule?.readonly ?? false} />
      {fieldState.invalid && <TextError msg={fieldState.error?.message ?? ''} />}
    </FlexBox>
  );
}

export default TextForm;
