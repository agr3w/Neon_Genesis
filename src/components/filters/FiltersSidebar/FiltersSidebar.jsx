import React from "react";
import { Box, Typography, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const FiltersSidebar = ({ categories, brands, selectedCategory, selectedBrand, onCategoryChange, onBrandChange }) => {
  return (
    <Box sx={{ width: 250, padding: 2, backgroundColor: "#f7f7f7", borderRadius: 2, boxShadow: 2 }}>
      {/* Filtro de Marcas */}
      <Typography variant="h6" gutterBottom>
        Marcas
      </Typography>
      <List>
        {brands.map((brand) => (
          <ListItem key={brand} disablePadding>
            <ListItemButton
              selected={selectedBrand === brand}
              onClick={() => onBrandChange(brand)}
              sx={{
                "&.Mui-selected": { backgroundColor: "#d60000", color: "#fff" },
                "&.Mui-selected:hover": { backgroundColor: "#b50000" },
              }}
            >
              <ListItemText primary={brand} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Filtro de Categorias */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
        Categorias
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem key={category} disablePadding>
            <ListItemButton
              selected={selectedCategory === category}
              onClick={() => onCategoryChange(category)}
              sx={{
                "&.Mui-selected": { backgroundColor: "#d60000", color: "#fff" },
                "&.Mui-selected:hover": { backgroundColor: "#b50000" },
              }}
            >
              <ListItemText primary={category} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FiltersSidebar;