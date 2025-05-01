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
} from "@mui/material";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const [cartItems] = useState([
    {
      id: 1,
      name: "Totem Ultra Pro",
      image:
        "https://wtotem.com.br/wp-content/uploads/2024/07/Experimente-a-Edicao-Magica-2.png",
      price: 2999.99,
      quantity: 1,
    },
    {
      id: 2,
      name: "Totem Express",
      image:
        "https://wtotem.com.br/wp-content/uploads/2024/07/Experimente-a-Edicao-Magica-2.png",
      price: 1999.99,
      quantity: 2,
    },
  ]);

  const [freight] = useState(50.0);
  // eslint-disable-next-line no-unused-vars
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [address] = useState({
    name: "Weslley Kampa",
    street: "Rua Capitão Leonardo Graziano, 1245",
    complement: "Casa aos fundos",
    city: "Araucária",
    state: "PR",
    zip: "83703-080",
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal + freight;

  // eslint-disable-next-line no-unused-vars
  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleFinalizePurchase = () => {
    alert("Compra finalizada com sucesso!");
  };

  return (
    <Box className="checkout-page-container">
      <Typography variant="h4" gutterBottom>
        Finalize Seu Pedido
      </Typography>

      <Grid container spacing={3}>
        {/* Endereço de Entrega */}
        <Grid item xs={12} md={8}>
          <Card className="checkout-card">
            <CardContent>
              <Typography variant="h6">Endereço de Entrega</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">
                {address.name} - <span className="address-tag">Padrão</span>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {address.street}, {address.complement}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {address.city} / {address.state} - CEP: {address.zip}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
                fullWidth
              >
                Alterar Endereço
              </Button>
            </CardContent>
          </Card>

          {/* Método de Envio */}
          <Card className="checkout-card" sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6">Método de Envio</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">
                DIBASE - CURITIBA - de 1 a 2 dias úteis
              </Typography>
              <Typography variant="body2" color="primary">
                R$ {freight.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Resumo do Pedido */}
        <Grid item xs={12} md={4}>
          <Box className="checkout-summary">
            <Typography variant="h6">Resumo do Pedido</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">Subtotal: R$ {subtotal.toFixed(2)}</Typography>
            <Typography variant="body1">Frete: R$ {freight.toFixed(2)}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Total: R$ {total.toFixed(2)}</Typography>
            <Divider sx={{ my: 2 }} />
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleFinalizePurchase}
              sx={{ mt: 2 }}
            >
              Continuar para Pagamento
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              href="/cart"
              sx={{ mt: 2 }}
            >
              Voltar ao Carrinho
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;