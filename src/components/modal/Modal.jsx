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
import { useTheme } from "@mui/material/styles";

const Modal = ({ open, onClose, children }) => {
  const theme = useTheme();
  return (
    <MUIModal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box className="modal-box" sx={{
          border: '3px solid',
          borderImage: 'linear-gradient(45deg, #7d26cd, #ff0033) 1',
          background: `
            linear-gradient(215deg, #0a0a12 40%, rgba(125, 38, 205, 0.2) 100%),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 5px,
              #00ff9d33 5px,
              #00ff9d33 10px
            )
          `,
          boxShadow: '0 0 30px rgba(0, 255, 157, 0.5)'
        }}>
          <IconButton 
            className="close-button" 
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              '&:hover': {
                '& svg': {
                  filter: 'drop-shadow(0 0 8px #ff0033)'
                }
              }
            }}
            onClick={onClose}
          >
            <motion.div
              whileHover={{ rotate: 90, scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <CloseIcon fontSize="large" sx={{
                color: theme.palette.nge.red,
                filter: 'drop-shadow(0 0 3px #ff0033)'
              }} />
            </motion.div>
          </IconButton>
          
          {/* Efeito de Terminal Scanline */}
          <Box sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 2px,
              ${theme.palette.nge.neonGreen}33 3px,
              transparent 4px
            )`,
            pointerEvents: 'none',
            mixBlendMode: 'screen'
          }} />

          {children}
        </Box>
      </Fade>
    </MUIModal>
  );
};

export default Modal;