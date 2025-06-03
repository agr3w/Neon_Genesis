import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  styled
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const NervFilterButton = styled(ListItemButton)(({ theme, selected }) => ({
  borderRadius: '4px',
  margin: '4px 0',
  transition: 'all 0.3s',
  borderLeft: selected ? `4px solid ${theme.palette.nge.red}` : '4px solid transparent',
  background: selected ? 'rgba(255, 0, 51, 0.1)' : 'transparent',
  '&:hover': {
    background: 'rgba(0, 255, 157, 0.1)',
    borderLeft: `4px solid ${theme.palette.nge.neonGreen}`
  },
  '& .MuiListItemText-primary': {
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: selected ? 700 : 500,
    color: selected ? theme.palette.nge.neonGreen : 'white'
  }
}));

const FiltersSidebar = ({ categories, type, selectedCategory, selectedType, onCategoryChange, onBrandChange }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      width: 280,
      p: 3,
      marginTop: 16,
      marginLeft: 2,
      borderRadius: '8px',
      background: 'linear-gradient(145deg, #1a1a2e, #0a0a12)',
      borderRight: `2px solid ${theme.palette.nge.purple}`,
      boxShadow: `0 0 20px rgba(125, 38, 205, 0.5)`,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 1px,
          rgba(0, 255, 157, 0.05) 1px,
          rgba(0, 255, 157, 0.05) 2px
        )`,
        pointerEvents: 'none'
      }
    }}>
      <Typography variant="h6" sx={{
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
        Filtros
      </Typography>

      {/* Filtro de Tipos */}
      {Array.isArray(type) && type.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{
            fontFamily: "'Orbitron', sans-serif",
            color: 'white',
            mt: 3,
            mb: 1,
            fontSize: '0.9rem',
            letterSpacing: '0.05em'
          }}>
            TIPOS
          </Typography>
          <Divider sx={{ borderColor: theme.palette.nge.purple, mb: 2 }} />
          <List>
            {type.map((type) => (
              <ListItem key={type} disablePadding>
                <NervFilterButton
                  selected={selectedType === type}
                  onClick={() => onBrandChange(type)}
                >
                  <ListItemText primary={type} />
                </NervFilterButton>
              </ListItem>
            ))}
          </List>
        </>
      )}

      {/* Filtro de Categorias */}
      <Typography variant="subtitle1" sx={{
        fontFamily: "'Orbitron', sans-serif",
        color: 'white',
        mt: 3,
        mb: 1,
        fontSize: '0.9rem',
        letterSpacing: '0.05em'
      }}>
        CATEGORIAS
      </Typography>
      <Divider sx={{ borderColor: theme.palette.nge.purple, mb: 2 }} />
      <List>
        {categories.map((category) => (
          <ListItem key={category} disablePadding>
            <NervFilterButton
              selected={selectedCategory === category}
              onClick={() => onCategoryChange(category)}
            >
              <ListItemText primary={category} />
            </NervFilterButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FiltersSidebar;