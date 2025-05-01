import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import "./ReviewPage.css";

 /**
  * @file ReviewPage.jsx
  * @description
  * Página de Revisão e Confirmação do Pedido.
  * Aqui, o usuário pode revisar os itens do pedido, informações de envio e pagamento antes de confirmar a compra.
  * @todo Adicionar lógica para calcular o subtotal, frete, desconto e total dinamicamente.
  * @todo Implementar a funcionalidade de confirmação do pedido.
  */

const ReviewPage = () => {
  const cartItems = [
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
  ];

  const address = {
    name: "Weslley Kampa",
    street: "Rua Capitão Leonardo Graziano, 1245",
    complement: "Casa aos fundos",
    city: "Araucária",
    state: "PR",
    zip: "83703-080",
  };

  const paymentMethod = "Cartão Crédito + PIX";
  const pixValue = 1388.99;
  const creditCardValue = 463.0;
  const subtotal = 7999.97;
  const freight = 28.47;
  const discount = 273.53;
  const total = subtotal + freight - discount;

  return (
    <Box className="review-page-container">
      <Typography variant="h4" gutterBottom>
        Revisão e Confirmação do Pedido
      </Typography>

      <Grid container spacing={3}>
        {/* Resumo do Pedido */}
        <Grid item xs={12} md={8}>
          <Card className="review-card">
            <CardContent>
              <Typography variant="h6">Itens no Pedido</Typography>
              <Divider sx={{ my: 2 }} />
              {cartItems.map((item) => (
                <Box key={item.id} sx={{ display: "flex", mb: 2 }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 80, height: 80, marginRight: 16 }}
                  />
                  <Box>
                    <Typography variant="body1">{item.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Quantidade: {item.quantity}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Preço Unitário: R$ {item.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      Subtotal: R$ {(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Informações de Envio */}
        <Grid item xs={12} md={4}>
          <Card className="review-card">
            <CardContent>
              <Typography variant="h6">Informações de Envio</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">{address.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {address.street}, {address.complement}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {address.city} / {address.state} - CEP: {address.zip}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                Método de Envio: DIBASE - CURITIBA - de 1 a 2 dias úteis
              </Typography>
              <Typography variant="body2" color="primary">
                Frete: R$ {freight.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Informações de Pagamento */}
        <Grid item xs={12} md={4}>
          <Card className="review-card">
            <CardContent>
              <Typography variant="h6">Informações de Pagamento</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">Método: {paymentMethod}</Typography>
              <Typography variant="body2" color="textSecondary">
                Valor no PIX: R$ {pixValue.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Valor no Cartão: R$ {creditCardValue.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="success">
                Desconto Aplicado: -R$ {discount.toFixed(2)}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Total: R$ {total.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          color="success"
          size="large"
          sx={{ mr: 2 }}
          onClick={() => alert("Pedido Confirmado!")}
        >
          Confirmar Pedido
        </Button>
        <Button variant="outlined" color="primary" size="large" href="/payment">
          Voltar para Pagamento
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewPage;