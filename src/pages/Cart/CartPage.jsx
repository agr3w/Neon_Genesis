import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Divider,
  TextField,
  styled
} from "@mui/material";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../hook/useAuth";
import { useTheme } from "@mui/material/styles";

const NervCartContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  background: `linear-gradient(180deg, ${theme.palette.nge.dark} 0%, #1a1a2e 100%)`,
  minHeight: '100vh'
}));

const NervCartItem = styled(Card)(({ theme }) => ({
  background: 'rgba(26, 26, 46, 0.7)',
  border: `2px solid ${theme.palette.nge.purple}`,
  borderRadius: '4px',
  marginBottom: theme.spacing(3),
  transition: 'all 0.3s',
  '&:hover': {
    borderColor: theme.palette.nge.neonGreen,
    boxShadow: `0 0 15px ${theme.palette.nge.neonGreen}`
  }
}));

const NervCartButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Orbitron', sans-serif",
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  borderRadius: '0',
  minWidth: '40px'
}));

const CartPage = () => {
  const theme = useTheme();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const [coupon, setCoupon] = useState("");

  const handleApplyCoupon = () => {
    if (coupon === "EVANGELION") {
      alert("CUPOM ATIVADO - 15% DE DESCONTO");
    } else {
      alert("CUPOM INVÁLIDO - TENTE 'EVANGELION'");
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, Math.max(1, newQuantity));
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal;

  return (
    <NervCartContainer>
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
        /// SISTEMA DE CARGA
      </Typography>

      {cartItems.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center',
          mt: 10
        }}>
          <Typography variant="h5" sx={{
            fontFamily: "'Orbitron', sans-serif",
            color: theme.palette.nge.red,
            mb: 3
          }}>
            SISTEMA VAZIO
          </Typography>
          <Button
            variant="contained"
            href="/totens"
            sx={{
              fontFamily: "'Orbitron', sans-serif",
              background: `linear-gradient(45deg, ${theme.palette.nge.purple} 0%, ${theme.palette.nge.red} 100%)`,
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            SELECIONAR UNIDADES
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Lista de Produtos */}
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <NervCartItem key={item.id}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt={item.name}
                      sx={{
                        objectFit: 'contain',
                        p: 2,
                        filter: 'drop-shadow(0 0 5px rgba(0, 255, 157, 0.3))'
                      }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <CardContent>
                      <Typography variant="h6" sx={{
                        fontFamily: "'Orbitron', sans-serif",
                        color: 'white',
                        mb: 1
                      }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" sx={{
                        fontFamily: "'Rajdhani', sans-serif",
                        color: 'rgba(255, 255, 255, 0.7)',
                        mb: 2
                      }}>
                        {item.description}
                      </Typography>
                      <Typography variant="body1" sx={{
                        fontFamily: "'Orbitron', sans-serif",
                        color: theme.palette.nge.red,
                        mb: 2
                      }}>
                        R$ {item.price.toFixed(2)}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        mb: 2
                      }}>
                        <NervCartButton
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          sx={{
                            border: `1px solid ${theme.palette.nge.purple}`,
                            color: 'white'
                          }}
                        >
                          -
                        </NervCartButton>
                        <Typography sx={{ 
                          mx: 2,
                          fontFamily: "'Orbitron', sans-serif",
                          color: 'white'
                        }}>
                          {item.quantity}
                        </Typography>
                        <NervCartButton
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          sx={{
                            border: `1px solid ${theme.palette.nge.purple}`,
                            color: 'white'
                          }}
                        >
                          +
                        </NervCartButton>
                      </Box>
                      <NervCartButton
                        onClick={() => handleRemoveItem(item.id)}
                        sx={{
                          background: theme.palette.nge.red,
                          color: 'white',
                          '&:hover': {
                            background: theme.palette.nge.dark,
                            border: `1px solid ${theme.palette.nge.red}`
                          }
                        }}
                      >
                        REMOVER
                      </NervCartButton>
                    </CardContent>
                  </Grid>
                </Grid>
              </NervCartItem>
            ))}
          </Grid>

          {/* Resumo do Pedido */}
          <Grid item xs={12} md={4}>
            <Box sx={{
              background: 'rgba(10, 10, 18, 0.8)',
              border: `2px solid ${theme.palette.nge.purple}`,
              borderRadius: '4px',
              p: 3
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
              
              <TextField
                label="CÓDIGO DE DESCONTO"
                variant="outlined"
                size="small"
                fullWidth
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: theme.palette.nge.purple
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.nge.neonGreen
                    }
                  },
                  '& label': {
                    color: theme.palette.nge.neonGreen,
                    fontFamily: "'Rajdhani', sans-serif"
                  }
                }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleApplyCoupon}
                sx={{
                  mt: 2,
                  fontFamily: "'Orbitron', sans-serif",
                  background: theme.palette.nge.purple,
                  letterSpacing: '0.1em',
                  '&:hover': {
                    background: theme.palette.nge.red
                  }
                }}
              >
                ATIVAR CÓDIGO
              </Button>
              <Button
                variant="contained"
                fullWidth
                href="/checkout"
                sx={{
                  mt: 2,
                  fontFamily: "'Orbitron', sans-serif",
                  background: `linear-gradient(45deg, ${theme.palette.nge.red} 0%, ${theme.palette.nge.purple} 100%)`,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  '&:hover': {
                    background: `linear-gradient(45deg, ${theme.palette.nge.purple} 0%, ${theme.palette.nge.red} 100%)`
                  }
                }}
              >
                INICIAR PROCESSO
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </NervCartContainer>
  );
};

export default CartPage;