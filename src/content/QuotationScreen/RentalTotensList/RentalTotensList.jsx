import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import "./RentalTotensList.css";
import totensData from "../../../data/totemData";
import RentalCard from "../../../components/cards/rentalCard/RentalCard";

const RentalTotensList = () => {
  // Filtrar apenas os totens disponíveis para locação
  const rentalTotens = totensData.filter((totem) =>
    totem.category.includes("locação")
  );

  return (
    <Box className="rental-totens-container">
      <Typography variant="h4" gutterBottom>
        Alugue nossas soluções de autoatendimento
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Realizamos locações tanto para períodos temporários quanto prolongados,
        atendendo às suas necessidades específicas. Escolha o modelo ideal para
        o seu negócio e solicite uma cotação.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        {rentalTotens.map((totem) => (
          <Grid item xs={12} sm={6} md={4} key={totem.id}>
            <RentalCard totem={totem} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RentalTotensList;