import React, { useState } from "react";
import "./TotensListPage.css";
import filtersData from "../../data/filtersData";
import GenericCard from "../../components/cards/GenericCard";
import { Box, Grid, Typography } from "@mui/material";
import FiltersSidebar from "../../components/filters/FiltersSidebar/FiltersSidebar";
import totensData from "../../data/totemData";

const TotensListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedBrand, setSelectedBrand] =useState("Todas");

  const filteredTotens = totensData.filter((totem) => {
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
        categories={filtersData.categories}
        brands={filtersData.brands}
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
            <Grid item key={totem.id}>
              <GenericCard
                image={totem.image}
                title={totem.title}
                // description={totem.description}
                price={totem.price}
                buttonText="Ver Detalhes"
                link={`/totem/${totem.id}`} // Define o link para o totem
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TotensListPage;