import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider
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
  const [openModal, setOpenModal] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);


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
          {pedidos
            .slice()
            .sort((a, b) => new Date(b.data) - new Date(a.data))
            .map((pedido) => (

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
                      onClick={() => {
                        setPedidoSelecionado(pedido);
                        setOpenModal(true);
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
      {/* Modal de detalhes do pedido */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: theme.palette.nge.dark,
            border: `2px solid ${theme.palette.nge.purple}`,
            color: 'white',
            fontFamily: "'Rajdhani', sans-serif"
          }
        }}
      >
        <DialogTitle sx={{
          fontFamily: "'Orbitron', sans-serif",
          color: theme.palette.nge.neonGreen,
          borderBottom: `1px solid ${theme.palette.nge.purple}`,
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Detalhes do Pedido #{pedidoSelecionado?.numero_pedido}
        </DialogTitle>
        <DialogContent>
          {pedidoSelecionado && (
            <Box>
              {/* Cabeçalho do Pedido */}
              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                mt: 2,
                mb: 2,
                gap: 2
              }}>
                <Box>
                  <Typography sx={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: theme.palette.nge.neonGreen,
                    fontSize: '1.1rem'
                  }}>
                    Pedido <b>#{pedidoSelecionado.numero_pedido}</b>
                  </Typography>
                  <Typography sx={{
                    color: "#fff",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '0.95rem'
                  }}>
                    Realizado em: {new Date(pedidoSelecionado.data).toLocaleString()}
                  </Typography>
                </Box>
                <Box>
                  <Chip
                    label={getStatusLabel(pedidoSelecionado.status)}
                    sx={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontWeight: 700,
                      background: theme.palette.nge.neonGreen,
                      color: theme.palette.nge.dark,
                      fontSize: '0.95rem'
                    }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 2, borderColor: theme.palette.nge.purple }} />

              {/* Valores do Pedido */}
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
                mb: 2
              }}>
                <Box>
                  <Typography sx={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: theme.palette.nge.neonGreen,
                    mb: 1
                  }}>
                    <b>Forma de Pagamento:</b>
                  </Typography>
                  <Typography sx={{
                    color: "#fff",
                    fontFamily: "'Rajdhani', sans-serif"
                  }}>
                    {getPaymentLabel(pedidoSelecionado.pagamento)}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: theme.palette.nge.neonGreen,
                    mb: 1
                  }}>
                    <b>Valor Total:</b>
                  </Typography>
                  <Typography sx={{
                    color: theme.palette.nge.red,
                    fontWeight: 700,
                    fontFamily: "'Rajdhani', sans-serif"
                  }}>
                    R$ {Number(pedidoSelecionado.valor_total).toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{
                background: 'rgba(10,10,18,0.7)',
                border: `1px solid ${theme.palette.nge.purple}`,
                borderRadius: 2,
                p: 2,
                mb: 2
              }}>
                <Typography sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: theme.palette.nge.neonGreen,
                  fontSize: '1.05rem'
                }}>
                  Subtotal: <span style={{ color: "#fff", fontFamily: "'Rajdhani', sans-serif" }}>R$ {Number(pedidoSelecionado.subtotal || 0).toFixed(2)}</span>
                </Typography>
                <Typography sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: theme.palette.nge.neonGreen,
                  fontSize: '1.05rem'
                }}>
                  Frete: <span style={{ color: "#fff", fontFamily: "'Rajdhani', sans-serif" }}>R$ {Number(pedidoSelecionado.freight || 0).toFixed(2)}</span>
                </Typography>
                {Number(pedidoSelecionado.discount) > 0 && (
                  <Typography sx={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: theme.palette.nge.neonGreen,
                    fontSize: '1.05rem'
                  }}>
                    Desconto: <span style={{ color: theme.palette.nge.neonGreen, fontWeight: 700, fontFamily: "'Rajdhani', sans-serif" }}>-R$ {Number(pedidoSelecionado.discount || 0).toFixed(2)}</span>
                  </Typography>
                )}
                <Divider sx={{ my: 1, borderColor: theme.palette.nge.purple }} />
                <Typography sx={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: theme.palette.nge.red,
                  fontSize: '1.15rem',
                  fontWeight: 700
                }}>
                  Total: <span style={{ color: "#fff", fontFamily: "'Rajdhani', sans-serif" }}>R$ {Number(pedidoSelecionado.valor_total || 0).toFixed(2)}</span>
                </Typography>
              </Box>

              {/* Endereço de Entrega */}
              <Divider sx={{ my: 2, borderColor: theme.palette.nge.purple }} />
              <Typography sx={{ mb: 1, fontFamily: "'Orbitron', sans-serif", color: theme.palette.nge.neonGreen }}>
                Endereço de Entrega:
              </Typography>
              <Box sx={{
                background: 'rgba(10,10,18,0.7)',
                border: `1px solid ${theme.palette.nge.purple}`,
                borderRadius: 2,
                p: 2,
                mb: 2,
                color: "#fff",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "1rem"
              }}>
                {pedidoSelecionado.enderecoDetalhado && typeof pedidoSelecionado.enderecoDetalhado === "object" ? (
                  <>
                    <b>{pedidoSelecionado.enderecoDetalhado.nome_destinatario}</b><br />
                    {pedidoSelecionado.enderecoDetalhado.endereco}, {pedidoSelecionado.enderecoDetalhado.numero}
                    {pedidoSelecionado.enderecoDetalhado.complemento ? `, ${pedidoSelecionado.enderecoDetalhado.complemento}` : ""}
                    <br />
                    {pedidoSelecionado.enderecoDetalhado.bairro} - {pedidoSelecionado.enderecoDetalhado.cidade}/{pedidoSelecionado.enderecoDetalhado.estado}<br />
                    CEP: {pedidoSelecionado.enderecoDetalhado.cep}<br />
                    Tel: {pedidoSelecionado.enderecoDetalhado.telefone}
                  </>
                ) : (
                  "Endereço não informado"
                )}
              </Box>

              {/* Itens do Pedido */}
              <Divider sx={{ my: 2, borderColor: theme.palette.nge.purple }} />
              <Typography sx={{ mb: 1, fontFamily: "'Orbitron', sans-serif", color: theme.palette.nge.neonGreen }}>
                Itens do Pedido:
              </Typography>
              <Box sx={{ pl: 1 }}>
                {Array.isArray(JSON.parse(pedidoSelecionado.detalhes)) ? (
                  JSON.parse(pedidoSelecionado.detalhes).map((item, idx) => (
                    <Typography key={idx} sx={{
                      mb: 0.5,
                      fontFamily: "'Rajdhani', sans-serif",
                      color: "#fff"
                    }}>
                      <span style={{ color: theme.palette.nge.neonGreen }}>{item.name}</span> x{item.quantity} — <span style={{ color: theme.palette.nge.red }}>R$ {Number(item.price).toFixed(2)}</span>
                    </Typography>
                  ))
                ) : (
                  <Typography>Não há detalhes dos itens.</Typography>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>

    </Box>
  );
}

export default Pedidos;