import { Button, Typography, Dialog } from '@mui/material';
import FlexBox from 'fe-modules/components/basic/FlexBox';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';

function FullImage({ imgSrc, open, onClose }: any) {
  return (
    <Dialog open={open} onClose={onClose}>
      <FlexBox sx={{ flexDirection: 'column', paddingY: 5 }}>
        <FlexBox sx={{ gap: 2, mb: 3 }}>
          {!isMobile && (
            <a href={imgSrc} target="_blank">
              <Button variant="outlined">View original</Button>
            </a>
          )}
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </FlexBox>
        <img
          src={imgSrc}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </FlexBox>
    </Dialog>
  );
}

const ExampleImg = ({ imgSrc }: { imgSrc: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const onCloseDialog = () => setOpen(false);

  return (
    <FlexBox sx={{ mb: '10px' }}>
      <div style={{ position: 'relative', width: 'auto', cursor: 'pointer' }}>
        <img src={imgSrc} style={{ height: 200, objectFit: 'contain' }} onClick={() => setOpen(true)} />
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
      <FullImage open={open} imgSrc={imgSrc} onClose={onCloseDialog} />
    </FlexBox>
  );
};

export default ExampleImg;
