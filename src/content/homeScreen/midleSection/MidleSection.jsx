import React, { useState } from "react";
import { Typography, IconButton, Box, Paper, styled } from "@mui/material";
import Modal from "../../../components/modal/Modal";
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
            <IconButton sx={{
              color: theme.palette.nge.neonGreen,
              fontSize: '2.5rem',
              mb: 2
            }}>
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

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        {selectedDiff && (
          <Box sx={{
            background: theme.palette.nge.dark,
            p: 4,
            border: `2px solid ${theme.palette.nge.purple}`,
            maxWidth: '800px',
            mx: 'auto'
          }}>
            <Box component="img"
              src={selectedDiff.image}
              sx={{
                width: '100%',
                mb: 3,
                borderBottom: `3px solid ${theme.palette.nge.red}`
              }}
            />
            <Typography variant="h4" sx={{
              color: theme.palette.nge.neonGreen,
              fontFamily: "'Orbitron', sans-serif",
              mb: 2
            }}>
              {selectedDiff.title}
            </Typography>
            <Typography sx={{
              color: 'white',
              fontFamily: "'Rajdhani', sans-serif",
              lineHeight: 1.6
            }}>
              {selectedDiff.details}
            </Typography>
          </Box>
        )}
      </Modal>
    </Box>
  );
};

export default MidleSection;