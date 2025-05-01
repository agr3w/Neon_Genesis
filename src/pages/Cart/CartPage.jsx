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

/**
 * Pagina do Carrinho de Compras.
 * @todo Necessario componetizar os itens do carrinho para reutilizacao e melhor manutencao.
 * @todo Falta implementar a funcionalidade de calcular o frete e aplicar o cupom de desconto.
 * @agr3w
 */

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Totem Ultra Pro",
      description:
        "Este totem é usado para autoatendimento em pontos de venda, controle de acesso e consulta de informações.",
      image:
        "https://wtotem.com.br/wp-content/uploads/2024/07/Experimente-a-Edicao-Magica-2.png",
      price: 2999.99,
      quantity: 1,
    },
    {
      id: 2,
      name: "Totem Express",
      description: "Compacto e rápido, ideal para pontos de alto fluxo.",
      image:
        "https://wtotem.com.br/wp-content/uploads/2024/07/Experimente-a-Edicao-Magica-2.png",
      price: 1999.99,
      quantity: 1,
    },
  ]);

  const [coupon, setCoupon] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [freight, setFreight] = useState(0);

  const handleApplyCoupon = () => {
    if (coupon === "DESCONTO10") {
      alert("Cupom aplicado com sucesso!");
    } else {
      alert("Cupom inválido!");
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal + freight;

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
              <Typography variant="body1">
                Frete: R$ {freight.toFixed(2)}
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
