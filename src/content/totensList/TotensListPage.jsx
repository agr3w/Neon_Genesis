import React, { useState } from "react";
import "./TotensListPage.css";
import totensCardData from "../../data/totensCardData";
import GenericCard from "../../components/cards/GenericCard";
import { Box, Grid, Typography } from "@mui/material";
import FiltersSidebar from "../../components/filters/FiltersSidebar/FiltersSidebar";

const TotensListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedBrand, setSelectedBrand] = useState("Todas");

  const categories = [
    "Todos",
    "Totens linha Industrial",
    "Totens linha Tablet",
    "Totens para autopagamento",
    "Totens para impressão de senhas",
    "Totens para mídia indoor",
  ];

  const brands = ["Todas", "Locarti", "Outra Marca"];

  const filteredTotens = totensCardData.filter((totem) => {
    const matchesCategory =
      selectedCategory === "Todos" || totem.category === selectedCategory;
    const matchesBrand =
      selectedBrand === "Todas" || totem.brand === selectedBrand;
    return matchesCategory && matchesBrand;
  });

  return (
    <Box sx={{ display: "flex", gap: 3, padding: 3 }}>
      {/* Barra lateral de filtros */}
      <FiltersSidebar
        categories={categories}
        brands={brands}
        selectedCategory={selectedCategory}
        selectedBrand={selectedBrand}
        onCategoryChange={setSelectedCategory}
        onBrandChange={setSelectedBrand}
      />

      {/* Área principal de listagem */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" gutterBottom>
          Totens
        </Typography>
        <Grid container spacing={3}>
          {filteredTotens.map((totem) => (
            <Grid item xs={12} sm={6} md={4} key={totem.id}>
              <GenericCard
                image={totem.image}
                title={totem.title}
                description={totem.description}
                buttonText="Ver Detalhes"
                onButtonClick={() => console.log(`Ver detalhes do totem ${totem.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TotensListPage;