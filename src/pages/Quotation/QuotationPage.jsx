import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Grid, Button } from "@mui/material";
import totensData from "../../data/totemData";
import "./QuotationPage.css";

const QuotationPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const totemId = queryParams.get("totem");

  const totem = totensData.find((t) => t.id === Number(totemId));

  return (
    <Box className="quotation-page-container">
      <Typography variant="h4" gutterBottom>
        Solicitação de Cotação
      </Typography>

      {totem ? (
        <Box className="selected-totem">
          <Typography variant="h6">Totem Selecionado:</Typography>
          <Box className="totem-details">
            <img
              src={totem.image}
              alt={totem.name}
              className="selected-totem-image"
            />
            <Box>
              <Typography variant="body1">{totem.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {totem.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <Typography variant="body1" color="error">
          Nenhum totem selecionado.
        </Typography>
      )}

      {/* Formulário de orçamento */}
      <Button variant="contained" color="success" sx={{ mt: 4 }}>
        Enviar Solicitação
      </Button>
    </Box>
  );
};

export default QuotationPage;