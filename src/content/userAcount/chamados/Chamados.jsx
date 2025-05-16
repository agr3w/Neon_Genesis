import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function Chamados() {
  return (
    <Box p={2}>
      <Typography variant="h6">Chamados Abertos</Typography>
      {/* Listagem e abertura de chamados */}
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Abrir Novo Chamado
      </Button>
    </Box>
  );
}

export default Chamados;