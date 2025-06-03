import React, { useState } from "react";
import { Typography, IconButton, Box, Paper, styled, Modal, Fade, Backdrop } from "@mui/material";
import differentialsData from "../../../data/differentialsData";
import { useTheme } from '@mui/material/styles';

const NervCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(1),
  background: 'rgba(26, 26, 46, 0.7)',
  border: `1px solid ${theme.palette.nge.purple}`,
  cursor: 'pointer',
  transition: 'all 0.3s',
  textAlign: 'center',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 0 15px ${theme.palette.nge.neonGreen}`,
    borderColor: theme.palette.nge.neonGreen
  }
}));

const MidleSection = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [selectedDiff, setSelectedDiff] = useState(null);

  const handleCardClick = (diff) => {
    setSelectedDiff(diff);
    setOpenModal(true);
  };

  return (
    <Box sx={{
      py: 8,
      background: 'linear-gradient(180deg, #0a0a12 0%, #1a1a2e 100%)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 157, 0.05) 0%, transparent 70%)'
      }
    }}>
      <Typography variant="h4" sx={{
        textAlign: 'center',
        mb: 6,
        fontFamily: "'Orbitron', sans-serif",
        color: theme.palette.nge.neonGreen,
        textTransform: 'uppercase',
        letterSpacing: '0.2em'
      }}>
        /// NOSSOS DIFERENCIAIS
      </Typography>

      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '1200px',
        mx: 'auto'
      }}>
        {differentialsData.map((diff, index) => (
          <NervCard
            key={index}
            elevation={3}
            onClick={() => handleCardClick(diff)}
            sx={{
              width: { xs: '100%', sm: '45%', md: '22%' },
              animation: `fadeIn 0.5s ease ${index * 0.1}s both`
            }}
          >
            <IconButton
              disableRipple
              sx={{
                color: theme.palette.nge.neonGreen,
                fontSize: '2.5rem',
                mb: 2,
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'rgba(0,255,157,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                transition: 'box-shadow 0.2s, background 0.2s',
                boxShadow: `0 0 0 0 transparent`,
                '& svg': {
                  fontSize: '2.2rem'
                },
                '&:hover': {
                  background: theme.palette.nge.neonGreen,
                  color: theme.palette.nge.dark,
                  boxShadow: `0 0 16px 2px ${theme.palette.nge.neonGreen}77`
                }
              }}
            >
              {diff.icon}
            </IconButton>
            <Typography variant="h6" sx={{
              color: 'white',
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700
            }}>
              {diff.title}
            </Typography>
          </NervCard>
        ))}
      </Box>

      {/* Modal próprio para este setor */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 300,
            sx: { background: "rgba(10,10,18,0.85)" }
          }
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              background: `linear-gradient(135deg, #1a1a2e 60%, #0a0a12 100%)`,
              p: { xs: 2, sm: 4 },
              border: `2px solid ${theme.palette.nge.purple}`,
              borderRadius: 4,
              maxWidth: 500,
              width: "90vw",
              mx: "auto",
              my: "10vh",
              boxShadow: `0 0 20px ${theme.palette.nge.neonGreen}`,
              position: "relative",
              outline: "none",
              textAlign: "center",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: 4,
                boxShadow: `0 0 60px 10px ${theme.palette.nge.purple}`,
                opacity: 0.15,
                zIndex: 0,
                pointerEvents: "none"
              }
            }}
          >
            <IconButton
              onClick={() => setOpenModal(false)}
              sx={{
                color: theme.palette.nge.red,
                background: theme.palette.nge.dark,
                border: `1px solid ${theme.palette.nge.red}`,
                boxShadow: `0 0 8px ${theme.palette.nge.red}`,
                "&:hover": {
                  background: theme.palette.nge.red,
                  color: theme.palette.nge.dark,
                  boxShadow: `0 0 24px ${theme.palette.nge.red}`
                },
                position: "absolute",
                top: 12,
                right: 12,
                zIndex: 2
              }}
            >
              &#10005;
            </IconButton>
            {selectedDiff && (
              <>
                <Box
                  component="img"
                  src={selectedDiff.image}
                  alt={selectedDiff.title}
                  sx={{
                    width: "100%",
                    maxHeight: 250,
                    objectFit: "contain",
                    mb: 3,
                    borderRadius: 2,
                    borderBottom: `3px solid ${theme.palette.nge.red}`,
                    boxShadow: `0 0 24px 0 ${theme.palette.nge.neonGreen}55`
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    color: theme.palette.nge.neonGreen,
                    fontFamily: "'Orbitron', sans-serif",
                    mb: 2,
                    letterSpacing: "0.08em",
                    textShadow: `0 0 8px ${theme.palette.nge.neonGreen}99`
                  }}
                >
                  {selectedDiff.title}
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontFamily: "'Rajdhani', sans-serif",
                    lineHeight: 1.6,
                    fontSize: "1.1rem",
                    mb: 2
                  }}
                >
                  {selectedDiff.details}
                </Typography>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default MidleSection;