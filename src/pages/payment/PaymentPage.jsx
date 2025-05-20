import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  InputAdornment,
  styled
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

/**
 * @description Esta página permite ao usuário escolher o método de pagamento e inserir os dados necessários para finalizar a compra.
 * @TODO Melhorar componentização e reutilização de código, especialmente nas const useState.
 * @TODO Adicionar validação de formulário para os campos.
 * @TODO Implementar lógica para calcular o valor do PIX e do cartão de crédito com base na porcentagem escolhida.
 * @TODO Adicionar lógica para lidar com o envio do formulário e a geração do QR Code para pagamento via PIX.
 * @TODO Implementar lógica para lidar com o envio do formulário e a geração do boleto bancário.
 * @TODO Implementar lógica para lidar com o envio do formulário e a validação dos dados do cartão de crédito.
 * @TODO Implementar lógica para lidar com o envio do formulário e a validação dos dados do Nubank.
 * @TODO Implementar lógica para lidar com o envio do formulário e a validação dos dados do cartão de crédito (2 cartões).
 * @TODO Melhorar a responsividade da página para dispositivos móveis.
 * @TODO Adicionar feedback visual para o usuário ao enviar o formulário (ex: carregando, sucesso, erro).
 * @TODO Adicionar testes unitários e de integração para garantir a funcionalidade correta da página.
 */

const NervPaymentContainer = styled(Box)(({ theme }) => ({
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

const NervPaymentCard = styled(Card)(({ theme }) => ({
  background: 'rgba(10, 10, 18, 0.8)',
  border: `2px solid ${theme.palette.nge.purple}`,
  borderRadius: '4px',
  boxShadow: `0 0 15px rgba(125, 38, 205, 0.3)`
}));

const NervPaymentRadio = styled(Radio)(({ theme }) => ({
  color: theme.palette.nge.purple,
  '&.Mui-checked': {
    color: theme.palette.nge.neonGreen
  }
}));

const NervPaymentButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Orbitron', sans-serif",
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  borderRadius: '0',
  transition: 'all 0.3s'
}));

const PaymentPage = () => {
  const theme = useTheme();
  const { cartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [freight] = useState(28.47);
  const [discount] = useState(273.53);
  const total = subtotal + freight - discount;

  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [pixPercentage, setPixPercentage] = useState(50);
  const [pixValue, setPixValue] = useState((total * pixPercentage) / 100);
  const [creditCardValue, setCreditCardValue] = useState(total - pixValue);
  const [formError, setFormError] = useState("");

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
    setFormError("");
  };

  const handlePixPercentageChange = (percentage) => {
    setPixPercentage(percentage);
    const newPixValue = (total * percentage) / 100;
    setPixValue(newPixValue);
    setCreditCardValue(total - newPixValue);
  };

  const handleContinueToReview = () => {
    if (
      paymentMethod === "credit_card_pix" &&
      pixValue + creditCardValue !== total
    ) {
      setFormError("VALORES DE PIX E CARTÃO DEVEM SOMAR O TOTAL");
      return;
    }
    localStorage.setItem(
      "paymentData",
      JSON.stringify({
        paymentMethod,
        pixValue,
        creditCardValue,
        discount,
        total,
      })
    );
    navigate("/review");
  };

  return (
    <NervPaymentContainer>
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
        /// AUTORIZAÇÃO DE PAGAMENTO
      </Typography>

      <Grid container spacing={3}>
        {/* Método de Pagamento */}
        <Grid item xs={12} md={8}>
          <NervPaymentCard>
            <CardContent>
              <Typography variant="h6" sx={{
                fontFamily: "'Orbitron', sans-serif",
                color: theme.palette.nge.neonGreen,
                mb: 2
              }}>
                MÉTODO DE PAGAMENTO
              </Typography>
              <Divider sx={{ 
                borderColor: theme.palette.nge.purple,
                mb: 2 
              }} />
              <RadioGroup
                value={paymentMethod}
                onChange={handlePaymentChange}
                sx={{ gap: 2 }}
              >
                {/* PIX */}
                <FormControlLabel
                  value="pix"
                  control={<NervPaymentRadio />}
                  label={
                    <Typography sx={{
                      fontFamily: "'Rajdhani', sans-serif",
                      color: 'white'
                    }}>
                      PAGUE VIA PIX (5% DE DESCONTO)
                    </Typography>
                  }
                />
                {paymentMethod === "pix" && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "'Rajdhani', sans-serif",
                      color: 'rgba(255, 255, 255, 0.7)',
                      mt: 1
                    }}
                  >
                    O QR CODE SERÁ GERADO APÓS CONFIRMAÇÃO
                  </Typography>
                )}

                {/* Boleto Bancário */}
                <FormControlLabel
                  value="boleto"
                  control={<NervPaymentRadio />}
                  label={
                    <Typography sx={{
                      fontFamily: "'Rajdhani', sans-serif",
                      color: 'white'
                    }}>
                      BOLETO BANCÁRIO
                    </Typography>
                  }
                />
                {paymentMethod === "boleto" && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "'Rajdhani', sans-serif",
                      color: 'rgba(255, 255, 255, 0.7)',
                      mt: 1
                    }}
                  >
                    PROCESSAMENTO EM ATÉ 2 DIAS ÚTEIS
                  </Typography>
                )}

                {/* Cartão de Crédito */}
                <FormControlLabel
                  value="credit_card"
                  control={<NervPaymentRadio />}
                  label={
                    <Typography sx={{
                      fontFamily: "'Rajdhani', sans-serif",
                      color: 'white'
                    }}>
                      CARTÃO DE CRÉDITO
                    </Typography>
                  }
                />
                {paymentMethod === "credit_card" && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{
                      fontFamily: "'Rajdhani', sans-serif",
                      color: 'rgba(255, 255, 255, 0.7)'
                    }}>
                      INSIRA OS DADOS DO CARTÃO:
                    </Typography>
                    <TextField
                      label="NÚMERO DO CARTÃO"
                      variant="outlined"
                      fullWidth
                      sx={{ mt: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CreditCardIcon sx={{ color: theme.palette.nge.neonGreen }} />
                          </InputAdornment>
                        ),
                        sx: {
                          '& input': {
                            fontFamily: "'Rajdhani', sans-serif"
                          }
                        }
                      }}
                    />
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={6}>
                        <TextField
                          label="MÊS VALIDADE"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="ANO VALIDADE"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField label="CVV" variant="outlined" fullWidth />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="NOME DO TITULAR"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* Cartão Crédito + PIX */}
                <FormControlLabel
                  value="credit_card_pix"
                  control={<NervPaymentRadio />}
                  label={
                    <Typography sx={{
                      fontFamily: "'Rajdhani', sans-serif",
                      color: 'white'
                    }}>
                      CARTÃO CRÉDITO + PIX
                    </Typography>
                  }
                />
                {paymentMethod === "credit_card_pix" && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{
                      fontFamily: "'Rajdhani', sans-serif",
                      color: 'rgba(255, 255, 255, 0.7)'
                    }}>
                      DIVIDA O PAGAMENTO:
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                      {[15, 25, 50, 75].map((percentage) => (
                        <NervPaymentButton
                          key={percentage}
                          variant={
                            pixPercentage === percentage
                              ? "contained"
                              : "outlined"
                          }
                          sx={{
                            minWidth: '60px',
                            ...(pixPercentage === percentage ? {
                              background: theme.palette.nge.purple,
                              color: 'white',
                              '&:hover': {
                                background: theme.palette.nge.red
                              }
                            } : {
                              borderColor: theme.palette.nge.neonGreen,
                              color: theme.palette.nge.neonGreen,
                              '&:hover': {
                                borderColor: theme.palette.nge.red,
                                color: theme.palette.nge.red
                              }
                            })
                          }}
                          onClick={() => handlePixPercentageChange(percentage)}
                        >
                          {percentage}%
                        </NervPaymentButton>
                      ))}
                    </Box>
                    <TextField
                      label="VALOR NO PIX"
                      variant="outlined"
                      fullWidth
                      value={`R$ ${pixValue.toFixed(2)}`}
                      sx={{ mt: 2 }}
                      InputProps={{
                        readOnly: true,
                        sx: {
                          '& input': {
                            fontFamily: "'Rajdhani', sans-serif",
                            color: theme.palette.nge.neonGreen
                          }
                        }
                      }}
                    />
                    <TextField
                      label="VALOR NO CARTÃO"
                      variant="outlined"
                      fullWidth
                      value={`R$ ${creditCardValue.toFixed(2)}`}
                      sx={{ mt: 2 }}
                      InputProps={{
                        readOnly: true,
                        sx: {
                          '& input': {
                            fontFamily: "'Rajdhani', sans-serif",
                            color: theme.palette.nge.neonGreen
                          }
                        }
                      }}
                    />
                    <Divider sx={{ 
                      borderColor: theme.palette.nge.purple,
                      my: 2 
                    }} />
                    <Typography variant="body2" sx={{
                      fontFamily: "'Rajdhani', sans-serif",
                      color: 'rgba(255, 255, 255, 0.7)'
                    }}>
                      DADOS DO CARTÃO:
                    </Typography>
                    <TextField
                      label="NÚMERO DO CARTÃO"
                      variant="outlined"
                      fullWidth
                      sx={{ mt: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CreditCardIcon sx={{ color: theme.palette.nge.neonGreen }} />
                          </InputAdornment>
                        ),
                        sx: {
                          '& input': {
                            fontFamily: "'Rajdhani', sans-serif"
                          }
                        }
                      }}
                    />
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={6}>
                        <TextField
                          label="MÊS VALIDADE"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="ANO VALIDADE"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField label="CVV" variant="outlined" fullWidth />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="NOME DO TITULAR"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField label="CPF" variant="outlined" fullWidth />
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </RadioGroup>
            </CardContent>
          </NervPaymentCard>
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
              FRETE: R$ {freight.toFixed(2)}
            </Typography>
            <Typography variant="body1" sx={{
              fontFamily: "'Rajdhani', sans-serif",
              color: theme.palette.nge.neonGreen,
              mb: 1
            }}>
              DESCONTO: -R$ {discount.toFixed(2)}
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
            <NervPaymentButton
              variant="contained"
              fullWidth
              onClick={handleContinueToReview}
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.nge.red} 0%, ${theme.palette.nge.purple} 100%)`,
                color: 'white',
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.nge.purple} 0%, ${theme.palette.nge.red} 100%)`,
                  boxShadow: `0 0 15px ${theme.palette.nge.red}`
                }
              }}
            >
              CONFIRMAR PAGAMENTO
            </NervPaymentButton>
            <NervPaymentButton
              variant="outlined"
              fullWidth
              href="/checkout"
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
              VOLTAR AO TRANSPORTE
            </NervPaymentButton>
          </Box>
        </Grid>
      </Grid>
    </NervPaymentContainer>
  );
};

export default PaymentPage;