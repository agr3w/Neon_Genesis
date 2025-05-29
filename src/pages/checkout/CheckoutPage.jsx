import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../hook/useAuth";
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
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  styled
} from "@mui/material";
import EnderecoForm from "../../content/userAcount/enderecos/EnderecoForm";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router";

const NervCheckoutContainer = styled(Box)(({ theme }) => ({
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
    pointerEvents: 'none'
  }
}));

const NervCheckoutCard = styled(Card)(({ theme }) => ({
  background: 'rgba(10, 10, 18, 0.8)',
  border: `2px solid ${theme.palette.nge.purple}`,
  borderRadius: '4px',
  marginBottom: theme.spacing(3),
  boxShadow: `0 0 15px rgba(125, 38, 205, 0.3)`
}));

const NervRadio = styled(Radio)(({ theme }) => ({
  color: theme.palette.nge.purple,
  '&.Mui-checked': {
    color: theme.palette.nge.neonGreen
  }
}));

const NervButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Orbitron', sans-serif",
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  borderRadius: '0',
  transition: 'all 0.3s'
}));

const CheckoutPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState(null);
  const [openEnderecoForm, setOpenEnderecoForm] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);

  useEffect(() => {
    if (user?.id) {
      axios.get(`http://localhost:3001/enderecos/${user.id}`).then((res) => {
        setAddresses(res.data);
        const principal = res.data.find(addr => addr.padrao);
        setAddress(principal || res.data[0] || null);
      });
    }
  }, [user?.id]);

  function handleSaveEndereco(data) {
    axios
      .post("http://localhost:3001/enderecos", { ...data, user_id: user.id })
      .then(() => {
        axios.get(`http://localhost:3001/enderecos/${user.id}`).then((res) => {
          setAddresses(res.data);
          setAddress(res.data[0]);
          setOpenEnderecoForm(false);
        });
      });
  }

  const handleConfirmarTransporte = () => {
    // Salva dados no localStorage
    localStorage.setItem(
      "checkoutData",
      JSON.stringify({
        address,
        selectedFreight,
        subtotal,
        total,
      })
    );
    navigate("/payment");
  };

  const [freightOptions] = useState([
    { label: "TRANSPORTE NERV (1-2 DIAS)", value: 50.0 },
    { label: "TRANSPORTE LENTO (5-10 DIAS)", value: 25.0 },
    { label: "TRANSPORTE RÁPIDO (2-4 DIAS)", value: 38.0 },
  ]);
  const [selectedFreight, setSelectedFreight] = useState(freightOptions[0].value);

  const handleFreightChange = (e) => setSelectedFreight(Number(e.target.value));

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + selectedFreight;

  return (
    <NervCheckoutContainer>
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
        /// PREPARAÇÃO DE LANÇAMENTO
      </Typography>

      <Grid container spacing={3}>
        {/* Endereço de Entrega */}
        <Grid item xs={12} md={8}>
          <NervCheckoutCard>
            <CardContent>
              <Typography variant="h6" sx={{
                fontFamily: "'Orbitron', sans-serif",
                color: theme.palette.nge.neonGreen,
                mb: 2
              }}>
                LOCAL DE LANÇAMENTO
              </Typography>
              <Divider sx={{
                borderColor: theme.palette.nge.purple,
                mb: 2
              }} />
              {addresses.length === 0 ? (
                <>
                  <Typography variant="body2" sx={{
                    fontFamily: "'Rajdhani', sans-serif",
                    color: theme.palette.nge.red,
                    mb: 2
                  }}>
                    NENHUM LOCAL CONFIGURADO
                  </Typography>
                  <NervButton
                    variant="contained"
                    sx={{
                      background: theme.palette.nge.red,
                      color: 'white',
                      '&:hover': {
                        background: theme.palette.nge.dark,
                        border: `2px solid ${theme.palette.nge.red}`
                      }
                    }}
                    onClick={() => setOpenEnderecoForm(true)}
                  >
                    ADICIONAR LOCAL
                  </NervButton>
                </>
              ) : address ? (
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
                  <NervButton
                    variant="outlined"
                    fullWidth
                    sx={{
                      mt: 2,
                      borderColor: theme.palette.nge.neonGreen,
                      color: theme.palette.nge.neonGreen,
                      '&:hover': {
                        borderColor: theme.palette.nge.red,
                        color: theme.palette.nge.red
                      }
                    }}
                    onClick={() => setOpenAddressModal(true)}
                  >
                    ALTERAR LOCAL
                  </NervButton>
                </>
              ) : (
                <Typography variant="body2" sx={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  CARREGANDO DADOS...
                </Typography>
              )}
            </CardContent>
          </NervCheckoutCard>

          {/* Modal para adicionar novo endereço */}
          <EnderecoForm
            open={openEnderecoForm}
            onClose={() => setOpenEnderecoForm(false)}
            onSave={handleSaveEndereco}
            initialData={null}
          />

          {/* Modal para selecionar endereço existente */}
          <Dialog
            open={openAddressModal}
            onClose={() => setOpenAddressModal(false)}
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
              SELECIONE UM LOCAL
            </DialogTitle>
            <DialogContent>
              {addresses.length === 0 ? (
                <Typography sx={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: theme.palette.nge.red
                }}>
                  NENHUM LOCAL CADASTRADO
                </Typography>
              ) : (
                addresses.map((addr) => (
                  <Card
                    key={addr.id}
                    sx={{
                      mb: 2,
                      background: 'rgba(26, 26, 46, 0.7)',
                      border: `2px solid ${address?.id === addr.id ? theme.palette.nge.neonGreen : theme.palette.nge.purple}`,
                      cursor: "pointer",
                      transition: 'all 0.3s',
                      '&:hover': {
                        borderColor: theme.palette.nge.neonGreen
                      }
                    }}
                    onClick={() => {
                      setAddress(addr);
                      setOpenAddressModal(false);
                    }}
                  >
                    <CardContent>
                      <Typography variant="body1" sx={{
                        fontFamily: "'Rajdhani', sans-serif",
                        color: 'white'
                      }}>
                        {addr.nome_destinatario}
                      </Typography>
                      <Typography variant="body2" sx={{
                        fontFamily: "'Rajdhani', sans-serif",
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}>
                        {addr.endereco}, {addr.complemento}
                      </Typography>
                      <Typography variant="body2" sx={{
                        fontFamily: "'Rajdhani', sans-serif",
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}>
                        {addr.cidade} / {addr.estado} - CEP: {addr.cep}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              )}
            </DialogContent>
            <DialogActions>
              <NervButton
                onClick={() => setOpenAddressModal(false)}
                sx={{
                  color: theme.palette.nge.neonGreen,
                  '&:hover': {
                    color: theme.palette.nge.red
                  }
                }}
              >
                FECHAR
              </NervButton>
              <NervButton
                variant="contained"
                sx={{
                  background: theme.palette.nge.red,
                  color: 'white',
                  ml: 2,
                  '&:hover': {
                    background: theme.palette.nge.neonGreen,
                    color: theme.palette.nge.dark
                  }
                }}
                onClick={() => {
                  setOpenAddressModal(false);
                  setOpenEnderecoForm(true);
                }}
              >
                ADICIONAR NOVO LOCAL
              </NervButton>
            </DialogActions>
          </Dialog>

          {/* Método de Envio */}
          <NervCheckoutCard sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{
                fontFamily: "'Orbitron', sans-serif",
                color: theme.palette.nge.neonGreen,
                mb: 2
              }}>
                MÉTODO DE TRANSPORTE
              </Typography>
              <Divider sx={{
                borderColor: theme.palette.nge.purple,
                mb: 2
              }} />
              <RadioGroup
                value={selectedFreight}
                onChange={handleFreightChange}
              >
                {freightOptions.map((opt) => (
                  <FormControlLabel
                    key={opt.value}
                    value={opt.value}
                    control={<NervRadio />}
                    label={
                      <Typography sx={{
                        fontFamily: "'Rajdhani', sans-serif",
                        color: 'white'
                      }}>
                        {opt.label} - R$ {opt.value.toFixed(2)}
                      </Typography>
                    }
                    sx={{ mb: 1 }}
                  />
                ))}
              </RadioGroup>
            </CardContent>
          </NervCheckoutCard>
        </Grid>

        {/* Resumo do Pedido */}
        <Grid item xs={12} md={4}>
          <Box sx={{
            background: 'rgba(10, 10, 18, 0.8)',
            border: `2px solid ${theme.palette.nge.purple}`,
            borderRadius: '4px',
            p: 3,
            boxShadow: `0 0 15px rgba(125, 38, 205, 0.3)`
          }}>
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
            <Typography variant="body1" sx={{
              fontFamily: "'Rajdhani', sans-serif",
              color: 'white',
              mb: 1
            }}>
              SUBTOTAL: R$ {subtotal.toFixed(2)}
            </Typography>
            <Typography variant="body1" sx={{
              fontFamily: "'Rajdhani', sans-serif",
              color: 'white',
              mb: 1
            }}>
              FRETE: R$ {selectedFreight.toFixed(2)}
            </Typography>
            <Divider sx={{
              borderColor: theme.palette.nge.purple,
              my: 2
            }} />
            <Typography variant="h6" sx={{
              fontFamily: "'Orbitron', sans-serif",
              color: theme.palette.nge.red,
              mb: 3
            }}>
              TOTAL: R$ {total.toFixed(2)}
            </Typography>
            <Divider sx={{
              borderColor: theme.palette.nge.purple,
              mb: 2
            }} />
            <NervButton
              variant="contained"
              fullWidth
              disabled={!address}
              onClick={handleConfirmarTransporte}
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.nge.red} 0%, ${theme.palette.nge.purple} 100%)`,
                color: 'white',
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.nge.purple} 0%, ${theme.palette.nge.red} 100%)`,
                  boxShadow: `0 0 15px ${theme.palette.nge.red}`
                },
                '&:disabled': {
                  background: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.3)'
                }
              }}
            >
              CONFIRMAR TRANSPORTE
            </NervButton>
            <NervButton
              variant="outlined"
              fullWidth
              href="/carrinho"
              sx={{
                mt: 2,
                borderColor: theme.palette.nge.neonGreen,
                color: theme.palette.nge.neonGreen,
                '&:hover': {
                  borderColor: theme.palette.nge.red,
                  color: theme.palette.nge.red
                }
              }}
            >
              VOLTAR À CARGA
            </NervButton>
          </Box>
        </Grid>
      </Grid>
    </NervCheckoutContainer>
  );
};

export default CheckoutPage;
