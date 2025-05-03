import React, { useState } from "react";
import "./TotensListPage.css";
import filtersData from "../../data/filtersData";
import totensData from "../../data/totemData";
import { Box, Typography } from "@mui/material";
import TotensGrid from "../../components/totens/totensGrid/TotensGrid";
import TotensFilter from "../../components/totens/totensFilter/TotensFilter";


const TotensListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedBrand, setSelectedBrand] = useState("Todas");

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
      <TotensFilter
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
        <TotensGrid totens={filteredTotens} />
      </Box>
    </Box>
  );
};

export default TotensListPage;