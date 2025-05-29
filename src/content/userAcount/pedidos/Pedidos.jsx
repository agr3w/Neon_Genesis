import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  styled
} from '@mui/material';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

const NervPedidoCard = styled(Card)(({ theme, status }) => ({
  background: `
    linear-gradient(145deg, #1a1a2e, #0a0a12),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      ${status === 'aprovado' ?
      theme.palette.nge.neonGreen + '33' :
      status === 'aguardando_pagamento' ?
        theme.palette.nge.orange + '33' :
        theme.palette.nge.purple + '33'} 3px,
      transparent 4px
    )`,
  borderLeft: `4px solid ${status === 'aprovado' ?
    theme.palette.nge.neonGreen :
    status === 'aguardando_pagamento' ?
      theme.palette.nge.orange :
      theme.palette.nge.purple}`,
  color: '#fff',
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 5px 15px ${status === 'aprovado' ?
      'rgba(0, 255, 157, 0.5)' :
      status === 'aguardando_pagamento' ?
        'rgba(255, 102, 0, 0.5)' :
        'rgba(125, 38, 205, 0.5)'}`
  }
}));

const NervStatusChip = styled(Chip)(({ theme, status }) => ({
  fontFamily: "'Orbitron', sans-serif",
  fontWeight: 700,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  background: status === 'aprovado' ?
    `linear-gradient(45deg, ${theme.palette.nge.neonGreen}, ${theme.palette.nge.hoverBlue})` :
    status === 'aguardando_pagamento' ?
      `linear-gradient(45deg, ${theme.palette.nge.orange}, ${theme.palette.nge.red})` :
      `linear-gradient(45deg, ${theme.palette.nge.purple}, ${theme.palette.nge.red})`,
  color: theme.palette.nge.dark,
  height: '28px'
}));

const NervButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Orbitron', sans-serif",
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontWeight: 700,
  borderRadius: '0',
  padding: '10px 24px',
  background: 'linear-gradient(45deg, #7d26cd, #ff0033)',
  '&:hover': {
    background: 'linear-gradient(45deg, #ff0033, #7d26cd)',
    boxShadow: '0 0 15px rgba(255, 0, 51, 0.5)'
  }
}));

function Pedidos({ userId }) {
  const theme = useTheme();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      axios.get(`http://localhost:3001/pedidos/${userId}`)
        .then(res => setPedidos(res.data))
        .finally(() => setLoading(false));
    }
  }, [userId]);

  function getStatusLabel(status) {
    if (status === "aprovado") return "APROVADO";
    if (status === "aguardando_pagamento") return "AGUARDANDO PAGAMENTO";
    if (status === "recebido") return "RECEBIDO";
    return status.toUpperCase();
  }

  function getPaymentLabel(payment) {
    if (payment === "credit_card") return "CARTÃO DE CRÉDITO";
    if (payment === "boleto") return "BOLETO BANCÁRIO";
    if (payment === "pix") return "PIX";
    return payment.toUpperCase();
  }

  return (
    <Box p={3} sx={{ background: '#0a0a12', borderRadius: '4px' }}>
      <Typography variant="h4" sx={{
        mb: 4,
        fontFamily: "'Orbitron', sans-serif",
        background: 'linear-gradient(45deg, #00ff9d, #00a1ff)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        mb: 3,
        borderBottom: `2px solid ${theme.palette.nge.purple}`,
        pb: 2,
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
        HISTÓRICO DE PEDIDOS
      </Typography>

      {loading ? (
        <Typography variant="body1" sx={{
          color: theme.palette.nge.neonGreen,
          fontFamily: "'Orbitron', sans-serif"
        }}>
          CARREGANDO PEDIDOS...
        </Typography>
      ) : pedidos.length === 0 ? (
        <Box sx={{
          textAlign: 'center',
          p: 4,
          border: `2px dashed ${theme.palette.nge.purple}`,
          borderRadius: '4px'
        }}>
          <Typography variant="h6" sx={{
            mb: 3,
            fontFamily: "'Orbitron', sans-serif",
            color: theme.palette.nge.red
          }}>
            NENHUM PEDIDO ENCONTRADO
          </Typography>
          <NervButton href="/totens">
            VER PRODUTOS
          </NervButton>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gap: 3 }}>
          {pedidos.map((pedido) => (
            <NervPedidoCard key={pedido.id} status={pedido.status}>
              <CardContent>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 1
                }}>
                  <Typography variant="h5" sx={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: theme.palette.nge.neonGreen,
                    letterSpacing: '0.05em'
                  }}>
                    PEDIDO #{pedido.numero_pedido}
                  </Typography>

                  <NervStatusChip
                    label={getStatusLabel(pedido.status)}
                    status={pedido.status}
                  />
                </Box>

                <Box sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 2,
                  mt: 2
                }}>
                  <Box>
                    <Typography sx={{
                      color: theme.palette.nge.neonGreen,
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: '0.9rem',
                      mb: 0.5
                    }}>
                      DATA:
                    </Typography>
                    <Typography sx={{
                      color: '#fff',
                      fontFamily: "'Rajdhani', sans-serif"
                    }}>
                      {new Date(pedido.data).toLocaleString()}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{
                      color: theme.palette.nge.neonGreen,
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: '0.9rem',
                      mb: 0.5
                    }}>
                      VALOR TOTAL:
                    </Typography>
                    <Typography sx={{
                      color: '#fff',
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 700
                    }}>
                      R$ {Number(pedido.valor_total).toFixed(2)}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{
                      color: theme.palette.nge.neonGreen,
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: '0.9rem',
                      mb: 0.5
                    }}>
                      FORMA DE PAGAMENTO:
                    </Typography>
                    <Typography sx={{
                      color: '#fff',
                      fontFamily: "'Rajdhani', sans-serif"
                    }}>
                      {getPaymentLabel(pedido.pagamento)}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{
                      color: theme.palette.nge.neonGreen,
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: '0.9rem',
                      mb: 0.5
                    }}>
                      STATUS:
                    </Typography>
                    <Typography sx={{
                      color: '#fff',
                      fontFamily: "'Rajdhani', sans-serif",
                      textTransform: 'uppercase'
                    }}>
                      {getStatusLabel(pedido.status)}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 3, textAlign: 'right' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      fontFamily: "'Orbitron', sans-serif",
                      letterSpacing: '0.05em',
                      color: theme.palette.nge.neonGreen,
                      borderColor: theme.palette.nge.neonGreen,
                      '&:hover': {
                        backgroundColor: theme.palette.nge.neonGreen,
                        color: theme.palette.nge.dark
                      }
                    }}
                  >
                    DETALHES DO PEDIDO
                  </Button>
                </Box>
              </CardContent>
            </NervPedidoCard>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Pedidos;