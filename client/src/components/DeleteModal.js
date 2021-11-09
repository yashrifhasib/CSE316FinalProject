import { React, useContext } from "react";
import { GlobalStoreContext } from '../store'
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

export default function DeleteModal() {
    const { store } = useContext(GlobalStoreContext);

  return (
    <div>
      <Modal
        open={(store.listMarkedForDeletion != null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="warning">
                    <AlertTitle>Info</AlertTitle>
                    Delete this Top 5 List
                    <br/>
                    <Button onClick={store.deleteMarkedList} variant="contained">Yes</Button>
                    <Button onClick={store.unmarkListForDeletion} variant="contained">No</Button>
                </Alert>
          </Typography>
          
         
        </Box>
      </Modal>
    </div>
  );
}
