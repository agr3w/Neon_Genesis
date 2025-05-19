import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Chip } from '@mui/material';
import axios from 'axios';

function Pedidos({ userId }) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3001/pedidos/${userId}`).then(res => setPedidos(res.data));
    }
  }, [userId]);

  function getStatusColor(status) {
    if (status === "aprovado") return "success";
    if (status === "aguardando_pagamento") return "warning";
    if (status === "recebido") return "info";
    return "default";
  }

  function getStatusLabel(status) {
    if (status === "aprovado") return "Pagamento Aprovado";
    if (status === "aguardando_pagamento") return "Aguardando Pagamento";
    if (status === "recebido") return "Recebido";
    return status;
  }

  return (
    <Box p={2}>
      <Typography variant="h6" sx={{ mb: 2 }}>Pedidos Realizados</Typography>
      {pedidos.length === 0 ? (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Nenhum pedido encontrado.
        </Typography>
      ) : (
        pedidos.map((pedido) => (
          <Card key={pedido.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700}>
                Pedido #{pedido.numero_pedido}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Data: {new Date(pedido.data).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Valor: R$ {Number(pedido.valor_total).toFixed(2)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Pagamento: {pedido.pagamento === "credit_card" ? "Cartão de Crédito" : pedido.pagamento}
              </Typography>
              <Chip
                label={getStatusLabel(pedido.status)}
                color={getStatusColor(pedido.status)}
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

export default Pedidos;