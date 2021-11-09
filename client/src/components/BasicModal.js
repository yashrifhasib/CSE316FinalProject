import * as React from 'react';
import { useContext } from 'react';
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const { auth } = useContext(AuthContext);
  
  function handleClose() {
    auth.clearError();
  }


  return (
    <div>
      <Modal
        open={(auth.error != null)}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    {auth.error}
                </Alert>
          </Typography>
          
          <Button onClick={handleClose} variant="contained">Close</Button>
        </Box>
      </Modal>
    </div>
  );
}
