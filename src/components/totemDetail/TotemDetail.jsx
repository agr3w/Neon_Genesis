import React from "react";
import { Box, Grid, Typography, Button, styled, Chip } from "@mui/material";
import { useParams } from "react-router";
import totensData from "../../data/totemData";
import { useCart } from "../../context/CartContext";
import { useTheme } from "@mui/material/styles";

const NervDetailButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Orbitron', sans-serif",
  background: 'linear-gradient(45deg, #7d26cd 0%, #ff0033 100%)',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '0',
  border: 'none',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  transition: 'all 0.3s',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 5px 15px ${theme.palette.nge.red}`,
    '&::before': {
      left: '100%'
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'all 0.5s'
  }
}));

const TotemDetail = ({ type }) => {
  const theme = useTheme();
  const { id } = useParams();
  const totem = totensData.find((t) => t.id === Number(id));
  const { addToCart } = useCart();

  if (!totem) {
    return (
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.nge.dark
      }}>
        <Typography variant="h5" sx={{ color: theme.palette.nge.red }}>
          /// UNIDADE NÃO ENCONTRADA
        </Typography>
      </Box>
    );
  }

  const handleAction = () => {
    if (type === "locacao") {
      console.log(`Solicitação de locação para o totem ${totem.name}`);
    } else {
      addToCart(totem);
    }
  };

  return (
    <Box sx={{
      p: 4,
      margin: '80px auto auto auto',
      background: 'linear-gradient(135deg, #0a0a12 0%, #1a1a2e 100%)',
      minHeight: '100vh'
    }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Box sx={{
            border: `3px solid ${theme.palette.nge.purple}`,
            p: 2,
            background: '#0a0a12',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0, 255, 157, 0.05) 5px, rgba(0, 255, 157, 0.05) 10px)',
              pointerEvents: 'none'
            }
          }}>
            <Box
              component="img"
              src={totem.image}
              sx={{
                width: '100%',
                height: '400px', //Mudar para ficar de acordo
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 10px rgba(0, 255, 157, 0.3))'
              }}
            />
            <Chip
              label={`ID: ${totem.id}`}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: theme.palette.nge.red,
                color: 'white',
                fontFamily: "'Orbitron', sans-serif"
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{
            color: 'white',
            '& h1': {
              fontFamily: "'Orbitron', sans-serif",
              color: theme.palette.nge.neonGreen,
              mb: 3,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: 0,
                width: '50px',
                height: '3px',
                background: theme.palette.nge.red
              }
            }
          }}>
            <Typography variant="h2" component="h1">
              {totem.name}
            </Typography>

            <Typography variant="h3" sx={{
              color: theme.palette.nge.red,
              mb: 3,
              fontFamily: "'Orbitron', sans-serif"
            }}>
              R$ {totem.price.toFixed(2)}
            </Typography>

            <Typography variant="body1" paragraph sx={{
              fontFamily: "'Rajdhani', sans-serif",
              lineHeight: 1.7,
              mb: 4
            }}>
              {totem.description}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <NervDetailButton onClick={handleAction}>
                {type === "locacao" ? "SOLICITAR LOCAÇÃO" : "ADICIONAR AO CARRINHO"}
              </NervDetailButton>

              <Button variant="outlined" sx={{
                borderColor: theme.palette.nge.neonGreen,
                color: theme.palette.nge.neonGreen,
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: '0.1em',
                '&:hover': {
                  background: 'rgba(0, 255, 157, 0.1)'
                }
              }}>
                ESPECIFICAÇÕES
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TotemDetail;