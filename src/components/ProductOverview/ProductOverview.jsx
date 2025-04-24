// src/content/ProductOverview.jsx
import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import "./ProductOverview.css";

const ProductOverview = ({ 
  title = "Para que serve o Totem de Autoatendimento", 
  text, 
  image 
}) => {
  return (
    <Box className="product-overview-container">
      <Grid container spacing={4} alignItems="center">
        {/* Texto */}
        <Grid item xs={12} md={6}>
          <Typography 
            variant="h5" 
            component="h3" 
            className="product-overview-title"
          >
            {title}
          </Typography>
          <Typography 
            variant="body1" 
            className="product-overview-text"
          >
            {text}
          </Typography>
        </Grid>

        {/* Imagem */}
        <Grid item xs={12} md={6}>
          <Box className="product-overview-image-container">
            <img 
              src={image} 
              alt={title} 
              className="product-overview-image" 
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductOverview;
