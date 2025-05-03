import React from "react";
import { Grid } from "@mui/material";
import GenericCard from "../../cards/GenericCard/GenericCard";
/**
 * Componente para renderizar a grade de totens.
 * @param {Object[]} totens - Lista de totens a serem exibidos.
 */
const TotensGrid = ({ totens }) => {
  return (
    <Grid container spacing={3}>
      {totens.map((totem) => (
        <Grid item key={totem.id}>
          <GenericCard
            image={totem.image}
            title={totem.name}
            description={totem.description}
            price={totem.price}
            buttonText={
              totem.type === "locacao" ? "Fazer Locação" : "Ver Detalhes"
            }
            link={
              totem.type === "locacao"
                ? `/locacao/${totem.id}`
                : `/totem/${totem.id}`
            }
            type={totem.type}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TotensGrid;