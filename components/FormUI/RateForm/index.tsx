import { useEffect } from 'react';
import { Box } from '@mui/material';
import FlexBox from 'fe-modules/components/basic/FlexBox';
import RateStar from 'fe-modules/components/FormUI/RateForm/RateStar';
import { FormUIProps } from 'fe-modules/models/FormUI/FormUI';
import { useController } from 'react-hook-form';

function RateForm({ form, uiSetting }: FormUIProps) {
  const { field } = useController({
    name: uiSetting.FormItem_id,
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
    <FlexBox
      sx={{
        width: '100%',
        justifyContent: 'center',
        fontSize: '50px',
        display: uiSetting.rule?.invisible ? 'none' : '',
      }}
    >
      {[1, 2, 3, 4, 5].map((value, index) => (
        <RateStar
          curValue={field?.value ? (field.value as number) : 0}
          value={value}
          onClick={onClickHandler}
          key={index}
        />
      ))}
    </FlexBox>
  );
}

export default RateForm;
