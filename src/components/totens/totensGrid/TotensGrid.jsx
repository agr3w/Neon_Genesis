import React from "react";
import { Grid2, styled } from "@mui/material";
import GenericCard from "../../cards/genericCard/GenericCard";
import { useTheme } from "@mui/material/styles";

const NervGridContainer = styled(Grid2)(({ theme }) => ({
  padding: theme.spacing(2), // Menos padding para mobile
  position: 'relative',
  justifyContent: 'center',
  width: '100%',
  boxSizing: 'border-box',
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
    <NervGridContainer container spacing={2} alignItems="stretch">
      {totens.map((totem) => (
        <Grid2
          item
          key={totem.id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            display: 'flex',         // faz o grid-item ser flex para o card preencher a altura
            flexDirection: 'column',
            alignItems: 'stretch',
            boxSizing: 'border-box'
          }}
        >
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
            sx={{
              width: '100%',
              height: '100%',      // garante que o card utilize a altura do grid-item
              maxWidth: '100%'
            }}
          />
        </Grid2>
      ))}
    </NervGridContainer>
  );
};

export default TotensGrid;