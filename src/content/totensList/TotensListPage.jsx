import React, { useState } from "react";
import { Box, Typography, styled } from "@mui/material";
import filtersData from "../../data/filtersData";
import totensData from "../../data/totemData";
import TotensGrid from "../../components/totens/totensGrid/TotensGrid";
import FiltersSidebar from "../../components/filters/FiltersSidebar/FiltersSidebar";
import { useTheme } from "@mui/material/styles";

const NervListHeader = styled(Typography)(({ theme }) => ({
  fontFamily: "'Orbitron', sans-serif",
  color: theme.palette.nge.neonGreen,
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  mb: 4,
  position: 'relative',
  '&::after': {
    content: '""',

    bottom: '-10px',
    left: 0,
    width: '100px',
    height: '3px',
    background: theme.palette.nge.red
  }
}));


const TotensListPage = () => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedType, setSelectedType] = useState("Todos");

  const filteredTotens = totensData.filter((totem) => {
    const matchesCategory = selectedCategory === "Todos" || totem.category === selectedCategory;
    const matchesType = selectedType === "Todos" || totem.type === selectedType;
    return matchesCategory && matchesType;
  });

  return (
    <Box sx={{
      display: "flex",
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a12 0%, #1a1a2e 100%)'
    }}>
      <FiltersSidebar
        categories={filtersData.categories}
        type={filtersData.type}
        selectedCategory={selectedCategory}
        selectedType={selectedType}
        onCategoryChange={setSelectedCategory}
        onBrandChange={setSelectedType}
      />

      <Box sx={{
        flex: 1,
        p: 4,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 157, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none'
        }
      }}>
        <NervListHeader variant="h3" margin={10} sx={{
          fontFamily: "'Orbitron', sans-serif",
          color: theme.palette.nge.neonGreen,
          mb: 2,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          '&::before': {
            content: '"// "',
            color: theme.palette.nge.red
          }
        }}>
          Unidades Disponíveis
        </NervListHeader>

        <Box>
          <TotensGrid totens={filteredTotens} />
        </Box>
      </Box>
    </Box>
  );
};

export default TotensListPage;