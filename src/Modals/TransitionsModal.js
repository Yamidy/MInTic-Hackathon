import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function TransitionsModal(props) {


// open ; es un booleano para desplegar el modal
// onClose ; es una función para cerrar
// title ; es el título
// children ; es el cuerpo

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" >
              {props.title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {props.children}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
