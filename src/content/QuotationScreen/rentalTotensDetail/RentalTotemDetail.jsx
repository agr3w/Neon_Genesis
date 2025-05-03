import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Button, Divider } from "@mui/material";
import "./RentalTotemDetail.css";
import totensData from "../../../data/totemData";

const RentalTotemDetail = () => {
  const { id } = useParams(); // Obtém o ID do totem da URL
  const navigate = useNavigate();

  // Busca os dados do totem pelo ID
  const totem = totensData.find((t) => t.id === Number(id));

  if (!totem) {
    return (
      <Box className="rental-totem-detail-container">
        <Typography variant="h5" align="center">
          Totem não encontrado.
        </Typography>
      </Box>
    );
  }

  const handleRequestQuotation = () => {
    navigate(`/orcamento?totem=${totem.id}`); // Redireciona para a página de orçamento com o ID do totem
  };

  return (
    <Box className="rental-totem-detail-container">
      <Grid container spacing={4}>
        {/* Imagem do Totem */}
        <Grid item xs={12} md={6}>
          <Box className="image-container">
            <img
              src={totem.image}
              alt={totem.name}
              className="rental-totem-image"
            />
          </Box>
        </Grid>

        {/* Informações do Totem */}
        <Grid item xs={12} md={6}>
          <Box className="rental-totem-info">
            <Typography variant="h4" gutterBottom>
              {totem.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              {totem.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="textSecondary">
              Marca: {totem.brand}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Categoria: {totem.category}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Button
              variant="contained"
              color="primary"
              onClick={handleRequestQuotation}
            >
              Solicitar Cotação
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RentalTotemDetail;
