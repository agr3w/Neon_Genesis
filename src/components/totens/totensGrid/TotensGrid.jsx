import React from "react";
import { Grid2, styled } from "@mui/material";
import GenericCard from "../../cards/genericCard/GenericCard";
import { useTheme } from "@mui/material/styles";

const NervGridContainer = styled(Grid2)(({ theme }) => ({
  padding: theme.spacing(4),
  position: 'relative',
  justifyContent: 'center',
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

const TotensGrid = ({ totens }) => {
  return (
    <NervGridContainer container spacing={4}>
      {totens.map((totem) => (
        <Grid2 item key={totem.id} xs={12} sm={6} md={4} lg={3}>
          <GenericCard
            image={totem.image}
            title={totem.name}
            description={totem.description}
            price={totem.price}
            buttonText={
              totem.type === "locacao" ? "SOLICITAR UNIDADE" : "DETALHES DA UNIDADE"
            }
            link={
              totem.type === "locacao"
                ? `/locacao/${totem.id}`
                : `/totem/${totem.id}`
            }
            type={totem.type}
          />
        </Grid2>
      ))}
    </NervGridContainer>
  );
};

export default TotensGrid;