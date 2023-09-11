import { Button, Typography } from '@mui/material';
import FlexBox from 'fe-modules/components/basic/FlexBox';
import { useModal } from 'fe-modules/hooks/useModal';
import { isMobile } from 'react-device-detect';

const ExampleImg = ({ imgSrc }: { imgSrc: string }) => {
  const { openModal, closeModal } = useModal();

  const onClick = () => {
    openModal(<FullImage />, { width: '80vw' });
  };

  const FullImage = () => {
    return (
      <FlexBox
        sx={{
          position: 'relative',
          flexDirection: 'column',
          width: '100%',
          gap: 1,
          p: 3,
        }}
      >
        <FlexBox sx={{ gap: 2, mb: 3 }}>
          {!isMobile && (
            <a href={imgSrc} target="_blank">
              <Button variant="outlined">View original</Button>
            </a>
          )}
          <Button variant="contained" onClick={closeModal}>
            Close
          </Button>
        </FlexBox>
        <img
          src={imgSrc}
          style={{
            position: 'relative',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        />
      </FlexBox>
    );
  };

  return (
    <FlexBox sx={{ mb: '10px' }}>
      <div style={{ position: 'relative', width: 'auto', cursor: 'pointer' }}>
        <img src={imgSrc} style={{ height: 200, objectFit: 'contain' }} onClick={onClick} />
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
    </FlexBox>
  );
};

export default ExampleImg;
