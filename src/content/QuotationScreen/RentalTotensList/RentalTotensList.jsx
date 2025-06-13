import React from "react";
import { Box, Grid2, Typography, styled } from "@mui/material";
import totensData from "../../../data/totemData";
import RentalCard from "../../../components/cards/rentalCard/RentalCard";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import { useTheme } from "@mui/material/styles";

const NervRentalContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  background: `linear-gradient(180deg, #0a0a12 0%, #1a1a2e 100%)`,
  minHeight: '100vh',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none'
  }
}));

const RentalTotensList = () => {
  const theme = useTheme();
  const rentalTotens = totensData.filter((totem) => 
    totem.category.includes("locação")
  );

  return (
    <>
      <Header />
      <NervRentalContainer marginTop={12}>
        <Typography variant="h3" sx={{
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
            width: '100px',
            height: '3px',
            background: theme.palette.nge.red
          }
        }}>
          /// UNIDADES PARA LOCAÇÃO
        </Typography>
        
        <Typography variant="body1" sx={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontFamily: "'Rajdhani', sans-serif",
          mb: 4,
          maxWidth: '800px',
          lineHeight: 1.7
        }}>
          Realizamos locações tanto para períodos temporários quanto prolongados,
          atendendo às suas necessidades específicas. Escolha o modelo ideal para
          o seu negócio e solicite uma cotação.
        </Typography>

        <Grid2 container spacing={4}>
          {rentalTotens.map((totem) => (
            <Grid2 item xs={12} sm={6} md={4} key={totem.id}>
              <RentalCard totem={totem} />
            </Grid2>
          ))}
        </Grid2>
      </NervRentalContainer>
      <Footer />
    </>
  );
};

export default RentalTotensList;