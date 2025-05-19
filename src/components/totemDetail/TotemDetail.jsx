// src/pages/TotemDetail.jsx

import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import "./TotemDetail.css";
import { useParams } from "react-router";
import totensData from "../../data/totemData";
import { useCart } from "../../context/CartContext";

const TotemDetail = ({ type }) => {
  const { id } = useParams();
  const totem = totensData.find((t) => t.id === Number(id));
  const { addToCart } = useCart();

  if (!totem) {
    return (
      <Box className="totem-detail-container">
        <Typography variant="h5" align="center">
          Totem não encontrado.
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
    <>
      <Box className="totem-detail-container">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box className="image-container">
              <img
                src={totem.image}
                alt={totem.name}
                className="totem-main-image"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="totem-info">
              <Typography variant="h4" component="h1" gutterBottom>
                {totem.name}
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                R$ {totem.price.toFixed(2)}
              </Typography>
              <Typography variant="body1" paragraph>
                {totem.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAction()}
              >
                {type === "locacao"
                  ? "Solicitar Locação"
                  : "Adicionar ao Carrinho"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TotemDetail;
