import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Modal as MUIModal,
  Box,
  Fade,
  Backdrop,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./Modal.css";

const Modal = ({ open, onClose, children }) => {
  return (
    <MUIModal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 300 }}
    >
      <Fade in={open}>
        <Box className="modal-box">
          <IconButton className="close-button" onClick={onClose} disableRipple disableFocusRipple>
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3, ease: "circOut" }}
            >
              <CloseIcon fontSize="large" />
            </motion.div>
          </IconButton>
          {children}
        </Box>
      </Fade>
    </MUIModal>
  );
};

export default Modal;
