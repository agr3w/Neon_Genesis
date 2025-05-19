// filepath: c:\Users\weslley\Devs\Neon_Genesis\src\pages\Cart\CartPage.jsx
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
} from "@mui/material";
import "./CartPage.css";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../hook/useAuth";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const [coupon, setCoupon] = useState("");

  const handleApplyCoupon = () => {
    if (coupon === "DESCONTO10") {
      alert("Cupom aplicado com sucesso!");
    } else {
      alert("Cupom inválido!");
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
    <Box className="cart-page-container">
      <Typography variant="h4" gutterBottom>
        Meu Carrinho
      </Typography>

      {cartItems.length === 0 ? (
        <Box className="empty-cart">
          <Typography variant="h6" color="textSecondary">
            Seu carrinho está vazio.
          </Typography>
          <Button variant="contained" color="primary" href="/totens">
            Ver Totens
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Lista de Produtos */}
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Card key={item.id} className="cart-item-card">
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt={item.name}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <CardContent>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.description}
                      </Typography>
                      <Typography variant="body1" color="primary">
                        R$ {item.price.toFixed(2)}
                      </Typography>
                      <Box className="quantity-controls">
                        <Button
                          size="small"
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                        >
                          -
                        </Button>
                        <Typography>{item.quantity}</Typography>
                        <Button
                          size="small"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </Box>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remover
                      </Button>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Grid>

          {/* Resumo do Pedido */}
          <Grid item xs={12} md={4}>
            <Box className="cart-summary">
              <Typography variant="h6">Resumo do Pedido</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">
                Subtotal: R$ {subtotal.toFixed(2)}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Total: R$ {total.toFixed(2)}</Typography>
              <Divider sx={{ my: 2 }} />
              <TextField
                label="Cupom de Desconto"
                variant="outlined"
                size="small"
                fullWidth
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleApplyCoupon}
                sx={{ mt: 2 }}
              >
                Aplicar Cupom
              </Button>
              <Button
                variant="contained"
                color="success"
                fullWidth
                href="/checkout"
                sx={{ mt: 2 }}
              >
                Finalizar Pedido
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CartPage;
