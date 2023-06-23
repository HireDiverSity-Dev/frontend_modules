import React, { useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box } from '@mui/material';
import { useController } from 'react-hook-form';
import { FormProps } from '..';

function RateForm({ pageForm, setting }: FormProps) {
  const { field } = useController({
    name: setting.formKey,
    control: pageForm.control,
    rules: setting.rules,
  });

  const onClickHandler = (num: number) => {
    if (!setting.rules?.default) {
      field.onChange(num);
    }
  };

  useEffect(() => {
    if (setting.rules?.default && setting.defaultValue) {
      field.onChange(setting.defaultValue);
    }
  }, [setting.rules?.default, setting.defaultValue]);

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', fontSize: '50px' }}>
      {[1, 2, 3, 4, 5].map((val, index) =>
        !field?.value || field.value < val ? (
          <StarOutlineIcon
            fontSize="inherit"
            sx={{ color: '#FFD700' }}
            key={index}
            onClick={() => {
              onClickHandler(val);
            }}
          />
        ) : (
          <StarIcon
            fontSize="inherit"
            sx={{ color: '#FFD700' }}
            key={index}
            onClick={() => {
              onClickHandler(val);
            }}
          />
        ),
      )}
    </Box>
  );
}

export default RateForm;
