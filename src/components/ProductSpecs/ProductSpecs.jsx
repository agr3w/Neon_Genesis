import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  styled
} from "@mui/material";
import specsData from "../../data/specsData";
import { useTheme } from "@mui/material/styles";

const NervSpecsTable = styled(TableContainer)(({ theme }) => ({
  background: 'rgba(10, 10, 18, 0.8)',
  border: `2px solid ${theme.palette.nge.purple}`,
  boxShadow: `0 0 20px rgba(125, 38, 205, 0.3)`,
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${theme.palette.nge.purple}`
  }
}));

const ProductSpecs = ({ totemId }) => {
  const theme = useTheme();
  const specs = specsData[totemId] || [];

  return (
    <Box sx={{ p: 4, background: 'linear-gradient(180deg, #1a1a2e 0%, #0a0a12 100%)' }}>
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
        Especificações Técnicas
      </Typography>

      <NervSpecsTable>
        <Table>
          <TableBody>
            {specs.map((spec, idx) => (
              <TableRow key={idx} sx={{
                '&:hover': {
                  background: 'rgba(0, 255, 157, 0.05)'
                }
              }}>
                <TableCell sx={{ 
                  fontFamily: "'Orbitron', sans-serif",
                  color: theme.palette.nge.neonGreen,
                  width: '40%'
                }}>
                  {spec.label}
                </TableCell>
                <TableCell sx={{ 
                  fontFamily: "'Rajdhani', sans-serif",
                  color: 'white',
                  fontWeight: 500
                }}>
                  {spec.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </NervSpecsTable>
    </Box>
  );
};

export default ProductSpecs;