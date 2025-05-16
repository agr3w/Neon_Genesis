import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function Pedidos() {
  return (
    <Box p={2}>
      <Typography variant="h6">Pedidos Realizados</Typography>
      {/* Listagem dos pedidos do usuário */}
      <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
        Nenhum pedido encontrado.
      </Typography>
    </Box>
  );
}

export default Pedidos;