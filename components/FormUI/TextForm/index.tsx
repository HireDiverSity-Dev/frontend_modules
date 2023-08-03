import { useEffect } from 'react';
import FlexBox from 'fe-modules/components/basic/FlexBox';
import TextError from 'fe-modules/components/FormUI/TextForm/TextError';
import TextInput from 'fe-modules/components/FormUI/TextForm/TextInput';
import { FormUIProps } from 'fe-modules/models/FormUI/FormUI';
import { useController } from 'react-hook-form';

function TextForm({ form, uiSetting, multiline }: FormUIProps & { multiline?: boolean }) {
  // 커스텀 패턴 전처리
  let patternValue = uiSetting?.data?.pattern?.value;
  if (uiSetting?.data?.pattern?.label === '커스텀') {
    patternValue = patternValue?.replace(/#/g, '[0-9]');
    patternValue = patternValue?.replace(/@/g, '[a-zA-Z]');
    patternValue = patternValue?.replace(/[*]/g, '.');
    patternValue = '^' + patternValue + '$';
  }

  let { field, fieldState } = useController({
    name: uiSetting.FormItem_id,
    control: form.control,
    rules: {
      required: uiSetting.rule?.required,
      pattern: uiSetting.data.pattern && {
        value: RegExp(patternValue as string),
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
    <FlexBox sx={{ flexDirection: 'column', width: '100', display: uiSetting.rule?.invisible ? 'none' : '' }}>
      <TextInput field={field} multiline={multiline ?? false} disabled={uiSetting.rule?.readonly ?? false} />
      {fieldState.invalid && <TextError msg={fieldState.error?.message ?? ''} />}
    </FlexBox>
  );
}

export default TextForm;
