import React from 'react';
import { Button, Typography } from '@mui/material';
import { useModal } from '@/hooks/useModal';
import FlexBox from '../others/FlexBox';

const ExampleImg = ({ imgSrc }: { imgSrc: string }) => {
  const { openModal } = useModal();

  const onClick = () => {
    openModal(<FullImage />, { maxWidth: '90vw', height: '90vh' });
  };

  const FullImage = () => {
    return (
      <FlexBox
        sx={{
          position: 'relative',
          flexDirection: 'column',
          width: '100%',
          height: '80vh',
          gap: 1,
          p: 3,
        }}
      >
        <a href={imgSrc} target="_blank">
          <Button variant="contained">원본 이미지 보기</Button>
        </a>
        <img
          src={imgSrc}
          style={{
            position: 'relative',
            height: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </FlexBox>
    );
  };

  return (
    <FlexBox sx={{ mb: '10px' }}>
      <a href={imgSrc} target="_blank">
        <div style={{ position: 'relative', width: 'auto', cursor: 'pointer' }}>
          <img src={imgSrc} style={{ height: 200, objectFit: 'contain' }} />
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: '0%',
              left: '100%',
              transform: 'translate(-100%, 0%)',
              backgroundColor: 'white',
              border: 'dashed 1px',
              px: '5px',
              py: '3px',
            }}
          >
            Click
          </Typography>
        </div>
      </a>
    </FlexBox>
  );
};

export default ExampleImg;
