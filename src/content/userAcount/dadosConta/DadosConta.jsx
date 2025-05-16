import { Box, Typography, Button } from "@mui/material";

function DadosConta() {
  return (
    <Box p={2}>
      <Typography variant="h6">Dados da Conta</Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Atualizar Cadastro
      </Button>
      <Button variant="outlined" color="error" sx={{ mt: 2, ml: 2 }}>
        Deletar Conta
      </Button>
    </Box>
  );
}

export default DadosConta;