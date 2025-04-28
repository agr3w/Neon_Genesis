import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import specsData from "../../data/specsData";
import "./ProductSpecs.css";

const ProductSpecs = ({ totemId }) => {
  const specs = specsData[totemId] || []; // Busca as specs pelo ID ou retorna um array vazio

  return (
    <Paper className="product-specs-card" elevation={2}>
      <Typography variant="h5" className="product-specs-title">
        Especificações Técnicas
      </Typography>
      <TableContainer>
        <Table>
          <TableBody>
            {specs.map((spec, idx) => (
              <TableRow key={idx}>
                <TableCell className="spec-label">{spec.label}</TableCell>
                <TableCell className="spec-value">{spec.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ProductSpecs;