import { useEffect } from 'react';
import { Box } from '@mui/material';
import RateStar from 'fe-modules/components/FormUI/RateForm/RateStar';
import { FormUIProps } from 'fe-modules/models/FormUI/FormUI';
import { useController } from 'react-hook-form';

function RateForm({ form, uiSetting }: FormUIProps) {
  const { field } = useController({
    name: uiSetting.formKey,
    control: form.control,
    rules: {
      required: uiSetting.rule?.required,
    },
  });

  const onClickHandler = (num: number) => {
    if (!uiSetting.rule?.default) {
      field.onChange(num);
    }
  };

  useEffect(() => {
    if (uiSetting.rule?.default && uiSetting.defaultValue) {
      field.onChange(uiSetting.defaultValue);
    }
  }, [uiSetting.rule?.default, uiSetting.defaultValue]);

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', fontSize: '50px' }}>
      {[1, 2, 3, 4, 5].map((value) => (
        <RateStar curValue={field?.value ? (field.value as number) : 0} value={value} onClick={onClickHandler} />
      ))}
    </Box>
  );
}

export default RateForm;
