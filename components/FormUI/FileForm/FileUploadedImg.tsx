import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ImageObj } from 'fe-modules/components/FormUI/FileForm';

interface Props {
  data: ImageObj;
  deleteImage: (key: number) => void;
  imageKey: number;
}

function FileUploadedImg({ data, deleteImage, imageKey }: Props) {
  const onClickHandler = () => {
    deleteImage(imageKey);
  };

  return (
    <Box sx={{ width: '100%', height: '50px', display: 'flex', gap: 1, my: 0.5, position: 'relative' }}>
      <Box sx={styles.mainContainer}>
        {data.type === 'image' && (
          <img src={data.localPath} alt="previewImage" style={{ height: '100%', aspectRatio: 1, objectFit: 'cover' }} />
        )}
        <Typography sx={styles.textContainer}>{data.name}</Typography>
        <Typography>{(data.size / 1024 ** 2).toFixed(1)}MB</Typography>
      </Box>
      <Box sx={styles.buttonContainer} onClick={onClickHandler}>
        <DeleteIcon />
      </Box>
      {data.loading && (
        <Box sx={styles.loading}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export default FileUploadedImg;

const styles = {
  mainContainer: {
    backgroundColor: '#dae6ff',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    flex: '1 1 auto',
    p: 1,
    borderRadius: '5px',
    minWidth: 0,
  },
  textContainer: {
    flex: 1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  buttonContainer: {
    backgroundColor: '#dae6ff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    p: 1,
    borderRadius: '5px',
  },
  loading: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 2,
    backgroundColor: '#00000040',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
