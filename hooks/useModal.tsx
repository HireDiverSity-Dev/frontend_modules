import { createContext, useContext, useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { Box, SxProps } from '@mui/system';

interface ModalProps {
  children: React.ReactNode;
}

interface ModalContextType {
  modal: React.ReactNode | null;
  openModal: (RC: React.ReactNode, customSx?: SxProps, callBack?: () => void) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModalImplement = () => {
  const [modal, setModal] = useState<React.ReactNode | null>(null);
  const [closeCallback, setCloseCallback] = useState<() => void | undefined>();

  useEffect(() => {
    //modal이 true에서 false로 바뀔때
    if (!modal) {
      if (closeCallback) closeCallback();
      setCloseCallback(undefined);
    }
  }, [modal]);

  const openModal = (RC: React.ReactNode, customSx?: SxProps, callBack?: () => void) => {
    if (callBack) {
      setCloseCallback(() => callBack);
    }
    setModal(
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          borderRadius: 1,
          maxWidth: '90%',
          maxHeight: '90%',
          ...customSx,
        }}
      >
        {RC}
      </Box>,
    );
  };

  const closeModal = () => {
    setModal(null);
  };

  return { modal, openModal, closeModal };
};

const ModalProvider = ({ children }: ModalProps) => {
  const modal = useModalImplement();

  return (
    <ModalContext.Provider value={modal}>
      <Modal open={!!modal.modal} onClose={modal.closeModal}>
        <>{modal.modal}</>
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

export { ModalProvider, useModal };
