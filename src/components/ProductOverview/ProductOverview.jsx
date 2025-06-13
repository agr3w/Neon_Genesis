import React from "react";
import { Grid, Typography, Box, styled } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const NervOverviewBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(
      90deg,
      ${theme.palette.nge.dark} 0%,
      #1a1a2e 50%,
      ${theme.palette.nge.dark} 100%
    )`,
    zIndex: -1
  }
}));

const ProductOverview = ({ title, text, image }) => {
  const theme = useTheme();
  return (
    <NervOverviewBox>
      <Grid container spacing={6} alignItems="center" sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" sx={{
            fontFamily: "'Orbitron', sans-serif",
            color: theme.palette.nge.neonGreen,
            mb: 4,
            textTransform: 'uppercase',
            '&::before': {
              content: '"/// "',
              color: theme.palette.nge.red
            }
          }}>
            {title}
          </Typography>
          
          <Typography variant="body1" sx={{
            fontFamily: "'Rajdhani', sans-serif",
            color: 'white',
            lineHeight: 1.8,
            fontSize: '1.1rem',
            '&::before': {
              content: '"> "',
              color: theme.palette.nge.purple,
              mr: 1
            }
          }}>
            {text}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{
            border: `3px solid ${theme.palette.nge.purple}`,
            boxShadow: `0 0 30px rgba(125, 38, 205, 0.5)`,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '30%',
              background: 'linear-gradient(0deg, rgba(10, 10, 18, 0.9) 0%, transparent 100%)'
            }
          }}>
            <Box
              component="img"
              src={image}
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block',
                filter: 'sepia(0.3) hue-rotate(180deg) contrast(1.2)'
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </NervOverviewBox>
  );
};

export default ProductOverview;