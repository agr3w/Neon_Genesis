import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function Enderecos() {
  return (
    <Box p={2}>
      <Typography variant="h6">Endereços Cadastrados</Typography>
      {/* Listagem e gerenciamento de endereços */}
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Adicionar Novo Endereço
      </Button>
    </Box>
  );
}

export default Enderecos;