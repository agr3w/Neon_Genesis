import React from "react";
import { Grid, Typography, Box, styled } from "@mui/material";
import testImg from "../../../assets/teste.jpg";
import { useTheme } from '@mui/material/styles';

const NervTextPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  background: 'rgba(10, 10, 18, 0.8)',
  borderLeft: `5px solid ${theme.palette.nge.red}`,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 255, 157, 0.05) 50%,
      transparent 100%
    )`,
    pointerEvents: 'none'
  }
}));

const WhyTotemSection = () => {
    const theme = useTheme();
  
  return (
    <Box sx={{
      py: 8,
      background: `linear-gradient(135deg, #0a0a12 0%, #1a1a2e 100%)`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Grid container sx={{ 
        maxWidth: '1200px',
        mx: 'auto',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <Grid item xs={12} md={6}>
          <NervTextPanel>
            <Typography variant="h3" sx={{
              fontFamily: "'Orbitron', sans-serif",
              color: theme.palette.nge.neonGreen,
              mb: 4,
              textTransform: 'uppercase',
              '&::before': {
                content: '"/// "',
                color: theme.palette.nge.red
              }
            }}>
              VANTAGENS DO TOTEM
            </Typography>
            <Typography variant="body1" sx={{
              color: 'white',
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '1.1rem',
              lineHeight: 1.7,
              '&::before': {
                content: '"> "',
                color: theme.palette.nge.purple,
                mr: 1
              }
            }}>
              Os totens de autoatendimento trazem agilidade, economia de recursos
              e uma experiência de uso mais independente para seus clientes. Além
              disso, reduzem filas, otimizam processos e reforçam a imagem de
              inovação da sua empresa.
            </Typography>
          </NervTextPanel>
        </Grid>

        <Grid item xs={12} md={6} sx={{ 
          position: 'relative',
          height: '500px'
        }}>
          <Box component="img"
            src={testImg}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'sepia(0.3) hue-rotate(180deg) contrast(1.2)',
              border: `3px solid ${theme.palette.nge.purple}`,
              boxShadow: `0 0 30px rgba(125, 38, 205, 0.5)`
            }}
          />
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '30%',
            background: 'linear-gradient(0deg, rgba(10, 10, 18, 0.9) 0%, transparent 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            p: 3
          }}>
            <Typography sx={{
              color: theme.palette.nge.neonGreen,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.8rem',
              letterSpacing: '0.1em'
            }}>
              SYSTEM STATUS: ONLINE
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WhyTotemSection;