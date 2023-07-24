import React from 'react';
import { Button, Typography } from '@mui/material';
import FlexBox from 'fe-modules/components/basic/FlexBox';
import { useModal } from 'fe-modules/hooks/useModal';
import { useTranslation } from 'next-i18next';

interface SubmitModalProps {
  title?: string | undefined;
  body?: string | undefined;
  button?: string | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  preset?: '성공' | '실패';
  translation?: (str: string) => string;
}

export function SubmitModal({ title, body, button, onClick, translation, preset }: SubmitModalProps) {
  const t = translation || useTranslation(['customForm', 'form', 'common']).t;
  const { closeModal } = useModal();

  const defaultOnClick = () => {
    closeModal();
  };

  return (
    <FlexBox
      sx={{
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        gap: 4,
        p: 1,
      }}
    >
      <Typography variant="subtitle1">{title ?? t(`모달.제출${preset}.제목`)}</Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
        {body ?? t(`모달.제출${preset}.본문`)}
      </Typography>
      <Button variant="contained" onClick={onClick ?? defaultOnClick}>
        {button ?? t(`모달.제출${preset}.버튼`)}
      </Button>
    </FlexBox>
  );
}

export default SubmitModal;
