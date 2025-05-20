import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Divider, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  styled 
} from "@mui/material";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../hook/useAuth";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

const NervReviewContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  background: `linear-gradient(180deg, ${theme.palette.nge.dark} 0%, #1a1a2e 100%)`,
  minHeight: '100vh',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `repeating-linear-gradient(
      0deg,
      transparent,
      transparent 1px,
      rgba(0, 255, 157, 0.05) 1px,
      rgba(0, 255, 157, 0.05) 2px
    )`,
    pointerEvents: 'none'
  }
}));

const NervReviewCard = styled(Card)(({ theme }) => ({
  background: 'rgba(10, 10, 18, 0.8)',
  border: `2px solid ${theme.palette.nge.purple}`,
  boxShadow: `0 0 20px rgba(125, 38, 205, 0.3)`,
  borderRadius: '4px'
}));

const NervConfirmButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Orbitron', sans-serif",
  background: `linear-gradient(45deg, ${theme.palette.nge.red} 0%, ${theme.palette.nge.purple} 100%)`,
  color: 'white',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  padding: '12px 24px',
  borderRadius: '0',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.nge.purple} 0%, ${theme.palette.nge.red} 100%)`,
    boxShadow: `0 0 15px ${theme.palette.nge.red}`
  }
}));

const ReviewPage = () => {
   const theme = useTheme();
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const paymentData = JSON.parse(localStorage.getItem("paymentData") || "{}");
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState(null);
  const [showPix, setShowPix] = useState(false);
  const [showBoleto, setShowBoleto] = useState(false);
  const [numeroPedido, setNumeroPedido] = useState("");

  useEffect(() => {
    if (user?.id) {
      axios.get(`http://localhost:3001/enderecos/${user.id}`).then((res) => {
        setAddresses(res.data);
        setAddress(res.data[0] || null);
      });
    }
  }, [user?.id]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const freight = paymentData.freight || 28.47;
  const discount = paymentData.discount || 0;
  const total = subtotal + freight - discount;

  function gerarNumeroPedido() {
    
    const now = new Date();
    return `NERV-${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now
      .getDate()
      .toString()
      .padStart(2, "0")}-${Math.floor(Math.random() * 9000 + 1000)}`;
  }

  function gerarLinhaDigitavel(numeroPedido) {
    const numero = numeroPedido || "0000000000";
    const base = numero.replace(/\D/g, "") + Date.now();
    return [
      base.slice(0, 5),
      base.slice(5, 10),
      base.slice(10, 15),
      base.slice(15, 20),
      base.slice(20, 25),
    ].join(" ");
  }

  function gerarPixPayload(numeroPedido, valor, nome = "NERV COMMERCE") {
    const numero = numeroPedido || "0000";
    return [
      "000201",
      "26360014BR.GOV.BCB.PIX",
      `52040000`,
      `5303986`,
      `5406${valor.toFixed(2)}`,
      `5802BR`,
      `5913${nome}`,
      `6009Tokyo-3`,
      `62070503***`,
      `6304${numero.slice(-4)}`,
    ].join("");
  }

  const numero_pedido = gerarNumeroPedido();

  const handleConfirmarPedido = async () => {
    setNumeroPedido(numero_pedido);
    try {
      const res = await axios.post("http://localhost:3001/pedidos", {
        user_id: user.id,
        numero_pedido,
        pagamento: paymentData.paymentMethod,
        data: new Date().toISOString().slice(0, 19).replace("T", " "),
        valor_total: total,
        status: "recebido",
        detalhes: JSON.stringify(cartItems),
        endereco: address,
      });
      setNumeroPedido(res.data.numero_pedido);

      if (paymentData.paymentMethod === "pix") setShowPix(true);
      if (paymentData.paymentMethod === "boleto") setShowBoleto(true);

      clearCart();
    } catch (err) {
      alert("ERRO NO SISTEMA - CONTATE O SUPORTE NERV");
    }
  };
 

  return (
    <NervReviewContainer>
      <Typography variant="h3" sx={{
        fontFamily: "'Orbitron', sans-serif",
        color: theme.palette.nge.neonGreen,
        mb: 4,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-10px',
          left: 0,
          width: '100px',
          height: '3px',
          background: theme.palette.nge.red
        }
      }}>
        /// CONFIRMAÇÃO DE ORDEM
      </Typography>
      
      <Grid container spacing={3}>
        {/* Endereço */}
        <Grid item xs={12} md={4}>
          <NervReviewCard>
            <CardContent>
              <Typography variant="h6" sx={{
                fontFamily: "'Orbitron', sans-serif",
                color: theme.palette.nge.neonGreen,
                mb: 2
              }}>
                LOCAL DE ENTREGA
              </Typography>
              <Divider sx={{ 
                borderColor: theme.palette.nge.purple,
                mb: 2 
              }} />
              {address ? (
                <>
                  <Typography variant="body1" sx={{
                    fontFamily: "'Rajdhani', sans-serif",
                    color: 'white',
                    mb: 1
                  }}>
                    {address.nome_destinatario}
                  </Typography>
                  <Typography variant="body2" sx={{
                    fontFamily: "'Rajdhani', sans-serif",
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}>
                    {address.endereco}, {address.complemento}
                  </Typography>
                  <Typography variant="body2" sx={{
                    fontFamily: "'Rajdhani', sans-serif",
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}>
                    {address.cidade} / {address.estado} - CEP: {address.cep}
                  </Typography>
                </>
              ) : (
                <Typography variant="body2" sx={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: theme.palette.nge.red
                }}>
                  NENHUM LOCAL ESPECIFICADO
                </Typography>
              )}
            </CardContent>
          </NervReviewCard>
        </Grid>

        {/* Itens do Pedido */}
        <Grid item xs={12} md={8}>
          <NervReviewCard>
            <CardContent>
              <Typography variant="h6" sx={{
                fontFamily: "'Orbitron', sans-serif",
                color: theme.palette.nge.neonGreen,
                mb: 2
              }}>
                UNIDADES SELECIONADAS
              </Typography>
              <Divider sx={{ 
                borderColor: theme.palette.nge.purple,
                mb: 2 
              }} />
              {cartItems.map((item) => (
                <Box key={item.id} sx={{ 
                  display: "flex", 
                  mb: 3,
                  borderBottom: `1px solid ${theme.palette.nge.purple}`,
                  pb: 2
                }}>
                  <Box
                    component="img"
                    src={item.image}
                    sx={{ 
                      width: 100, 
                      height: 100, 
                      mr: 3,
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 0 5px rgba(0, 255, 157, 0.3))'
                    }}
                  />
                  <Box>
                    <Typography variant="body1" sx={{
                      fontFamily: "'Orbitron', sans-serif",
                      color: 'white',
                      mb: 1
                    }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{
                      fontFamily: "'Rajdhani', sans-serif",
                      color: 'rgba(255, 255, 255, 0.7)'
                    }}>
                      QUANTIDADE: {item.quantity}
                    </Typography>
                    <Typography variant="body2" sx={{
                      fontFamily: "'Rajdhani', sans-serif",
                      color: 'rgba(255, 255, 255, 0.7)'
                    }}>
                      PREÇO UNITÁRIO: R$ {item.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" sx={{
                      fontFamily: "'Orbitron', sans-serif",
                      color: theme.palette.nge.red,
                      mt: 1
                    }}>
                      SUBTOTAL: R$ {(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </NervReviewCard>
        </Grid>
      </Grid>

      {/* Resumo */}
      <Box sx={{ mt: 4 }}>
        <NervReviewCard>
          <CardContent>
            <Typography variant="h6" sx={{
              fontFamily: "'Orbitron', sans-serif",
              color: theme.palette.nge.neonGreen,
              mb: 2
            }}>
              RESUMO DA ORDEM
            </Typography>
            <Divider sx={{ 
              borderColor: theme.palette.nge.purple,
              mb: 2 
            }} />
            <Typography sx={{
              fontFamily: "'Rajdhani', sans-serif",
              color: 'white'
            }}>
              SUBTOTAL: R$ {subtotal.toFixed(2)}
            </Typography>
            <Typography sx={{
              fontFamily: "'Rajdhani', sans-serif",
              color: 'white',
              mt: 1
            }}>
              FRETE: R$ {freight.toFixed(2)}
            </Typography>
            <Typography sx={{
              fontFamily: "'Rajdhani', sans-serif",
              color: theme.palette.nge.neonGreen,
              mt: 1
            }}>
              DESCONTO: R$ {discount.toFixed(2)}
            </Typography>
            <Typography variant="h6" sx={{
              fontFamily: "'Orbitron', sans-serif",
              color: theme.palette.nge.red,
              mt: 2
            }}>
              TOTAL: R$ {total.toFixed(2)}
            </Typography>
            <Divider sx={{ 
              borderColor: theme.palette.nge.purple,
              my: 2 
            }} />
            <Typography variant="h6" sx={{
              fontFamily: "'Orbitron', sans-serif",
              color: theme.palette.nge.neonGreen
            }}>
              MÉTODO DE PAGAMENTO
            </Typography>
            <Typography sx={{
              fontFamily: "'Orbitron', sans-serif",
              color: 'white',
              mt: 1
            }}>
              {paymentData.paymentMethod === "pix" && "PIX (5% DE DESCONTO)"}
              {paymentData.paymentMethod === "boleto" && "BOLETO BANCÁRIO"}
              {paymentData.paymentMethod === "credit_card" && "CARTÃO DE CRÉDITO"}
              {paymentData.paymentMethod === "credit_card_pix" && "CARTÃO + PIX"}
              {paymentData.paymentMethod === "nubank" && "NUBANK"}
              {paymentData.paymentMethod === "two_cards" && "2 CARTÕES"}
            </Typography>
          </CardContent>
        </NervReviewCard>
      </Box>

      {/* Botões */}
      <Box sx={{ 
        mt: 4, 
        textAlign: "center",
        display: 'flex',
        justifyContent: 'center',
        gap: 3
      }}>
        <NervConfirmButton
          onClick={handleConfirmarPedido}
          disabled={!address}
        >
          CONFIRMAR ORDEM
        </NervConfirmButton>
        <Button 
          variant="outlined" 
          sx={{
            borderColor: theme.palette.nge.neonGreen,
            color: theme.palette.nge.neonGreen,
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: '0.1em',
            '&:hover': {
              borderColor: theme.palette.nge.red,
              color: theme.palette.nge.red
            }
          }}
          href="/payment"
        >
          VOLTAR
        </Button>
      </Box>

      {/* Modal PIX */}
      <Dialog 
        open={showPix} 
        onClose={() => setShowPix(false)}
        PaperProps={{
          sx: {
            background: theme.palette.nge.dark,
            border: `2px solid ${theme.palette.nge.purple}`,
            color: 'white'
          }
        }}
      >
        <DialogTitle sx={{
          fontFamily: "'Orbitron', sans-serif",
          color: theme.palette.nge.neonGreen,
          borderBottom: `1px solid ${theme.palette.nge.purple}`
        }}>
          /// PAGAMENTO VIA PIX
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", pt: 3 }}>
          <Typography variant="body1" sx={{ 
            fontFamily: "'Rajdhani', sans-serif",
            mb: 3
          }}>
            ESCANEIE O CÓDIGO PARA CONCLUIR O PAGAMENTO:
          </Typography>

          <Box sx={{
            p: 2,
            border: `2px solid ${theme.palette.nge.neonGreen}`,
            display: 'inline-block',
            mb: 3,
            background: 'white'
          }}>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                gerarPixPayload(
                  numero_pedido,
                  total,
                  user?.primeiro_nome || "NERV"
                )
              )}`}
              alt="QR Code PIX"
            />
          </Box>

          <Typography variant="caption" sx={{ 
            mt: 2, 
            display: "block",
            fontFamily: "'Rajdhani', sans-serif",
            wordBreak: "break-all",
            background: 'rgba(0,0,0,0.3)',
            p: 2
          }}>
            CÓDIGO PIX:<br />
            {gerarPixPayload(
              numero_pedido,
              total,
              user?.primeiro_nome || "NERV"
            )}
          </Typography>
          <Typography variant="body2" sx={{ 
            mt: 3,
            fontFamily: "'Orbitron', sans-serif"
          }}>
            NÚMERO DA ORDEM: {numero_pedido}
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Modal Boleto */}
      <Dialog 
        open={showBoleto} 
        onClose={() => setShowBoleto(false)}
        PaperProps={{
          sx: {
            background: theme.palette.nge.dark,
            border: `2px solid ${theme.palette.nge.purple}`,
            color: 'white'
          }
        }}
      >
        <DialogTitle sx={{
          fontFamily: "'Orbitron', sans-serif",
          color: theme.palette.nge.neonGreen,
          borderBottom: `1px solid ${theme.palette.nge.purple}`
        }}>
          /// BOLETO BANCÁRIO
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", pt: 3 }}>
          <Typography variant="body1" sx={{ 
            fontFamily: "'Rajdhani', sans-serif",
            mb: 3
          }}>
            LINHA DIGITÁVEL:
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "monospace",
              letterSpacing: "2px",
              mb: 4,
              wordBreak: "break-all",
              color: theme.palette.nge.neonGreen,
              background: 'rgba(0,0,0,0.3)',
              p: 2
            }}
          >
            {numero_pedido ? gerarLinhaDigitavel(numero_pedido) : ""}
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: theme.palette.nge.red,
              fontFamily: "'Orbitron', sans-serif",
              '&:hover': {
                background: theme.palette.nge.purple
              }
            }}
            onClick={() =>
              window.open(
                "https://www.bb.com.br/docs/pub/inst/dwn/BoletoBB.pdf",
                "_blank"
              )
            }
          >
            VISUALIZAR BOLETO
          </Button>
          <Typography variant="body2" sx={{ 
            mt: 3,
            fontFamily: "'Orbitron', sans-serif"
          }}>
            NÚMERO DA ORDEM: {numero_pedido}
          </Typography>
        </DialogContent>
      </Dialog>
    </NervReviewContainer>
  );
};

export default ReviewPage;