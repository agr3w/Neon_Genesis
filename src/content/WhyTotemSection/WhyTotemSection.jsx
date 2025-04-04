// src/content/WhyTotemSection.jsx
import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import "./WhyTotemSection.css";

const WhyTotemSection = () => {
  return (
    <section className="why-totem-section">
      <Box className="why-totem-card">
        <Grid container className="why-totem-grid">
          {/* Área de texto */}
          <Grid item xs={12} md={6} className="why-totem-text">
            <Typography variant="h4" component="h2" className="why-totem-title">
              Vantagens de ter um totem de autoatendimento
            </Typography>
            <Typography variant="body1" className="why-totem-description">
              Os totens de autoatendimento trazem agilidade, economia de recursos e
              uma experiência de uso mais independente para seus clientes. Além disso,
              reduzem filas, otimizam processos e reforçam a imagem de inovação da sua empresa.
            </Typography>
          </Grid>

          {/* Área da imagem do totem */}
          <Grid item xs={12} md={6} className="why-totem-image">
            <img
              src="https://via.placeholder.com/500x400?text=Totem+de+Autoatendimento"
              alt="Totem de Autoatendimento"
            />
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default WhyTotemSection;
