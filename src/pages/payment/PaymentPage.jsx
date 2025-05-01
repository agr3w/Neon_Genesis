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
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import "./PaymentPage.css";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [subtotal] = useState(1823.52);
  const [freight] = useState(28.47);
  const [discount] = useState(273.53); // Exemplo de desconto para pagamento à vista
  const total = subtotal + freight - discount;

  const [pixPercentage, setPixPercentage] = useState(50); // Porcentagem inicial para PIX
  const [pixValue, setPixValue] = useState((total * pixPercentage) / 100);
  const [creditCardValue, setCreditCardValue] = useState(total - pixValue);
  // eslint-disable-next-line no-unused-vars
  const [formError, setFormError] = useState("");

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
    setFormError(""); // Limpa erros ao trocar método de pagamento
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
      setFormError("Os valores de PIX e cartão devem somar o total do pedido.");
      return;
    }
    alert(`Forma de pagamento selecionada: ${paymentMethod}`);
  };

  return (
    <Box className="payment-page-container">
      <Typography variant="h4" gutterBottom>
        Finalize Seu Pedido
      </Typography>

      <Grid container spacing={3}>
        {/* Método de Pagamento */}
        <Grid item xs={12} md={8}>
          <Card className="payment-card">
            <CardContent>
              <Typography variant="h6">Método de Pagamento</Typography>
              <Divider sx={{ my: 2 }} />
              <RadioGroup
                value={paymentMethod}
                onChange={handlePaymentChange}
                sx={{ gap: 2 }}
              >
                {/* PIX */}
                <FormControlLabel
                  value="pix"
                  control={<Radio />}
                  label="Pague via PIX"
                />
                {paymentMethod === "pix" && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    O QR Code para pagamento será gerado após a conclusão do
                    pedido.
                  </Typography>
                )}

                {/* Boleto Bancário */}
                <FormControlLabel
                  value="boleto"
                  control={<Radio />}
                  label="Boleto Bancário"
                />
                {paymentMethod === "boleto" && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    Seu pedido será processado em até 2 dias úteis após o
                    pagamento.
                  </Typography>
                )}

                {/* Cartão de Crédito */}
                <FormControlLabel
                  value="credit_card"
                  control={<Radio />}
                  label="Cartão de Crédito"
                />
                {paymentMethod === "credit_card" && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      Insira os dados do cartão:
                    </Typography>
                    <TextField
                      label="Número do Cartão"
                      variant="outlined"
                      fullWidth
                      sx={{ mt: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CreditCardIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={6}>
                        <TextField
                          label="Mês Validade"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Ano Validade"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField label="CVV" variant="outlined" fullWidth />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Nome do Titular"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* Nubank */}
                <FormControlLabel
                  value="nubank"
                  control={<Radio />}
                  label="Nubank - Até 15x s/ Juros ou 24x c/ Juros"
                />
                {paymentMethod === "nubank" && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    Escolha o parcelamento na próxima etapa.
                  </Typography>
                )}

                {/* Cartão Crédito + PIX */}
                <FormControlLabel
                  value="credit_card_pix"
                  control={<Radio />}
                  label="Cartão Crédito + PIX"
                />
                {paymentMethod === "credit_card_pix" && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      Divida o pagamento entre PIX e cartão de crédito.
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                      {[15, 25, 50, 75].map((percentage) => (
                        <Button
                          key={percentage}
                          variant={
                            pixPercentage === percentage
                              ? "contained"
                              : "outlined"
                          }
                          onClick={() => handlePixPercentageChange(percentage)}
                        >
                          {percentage}%
                        </Button>
                      ))}
                    </Box>
                    <TextField
                      label="Valor no PIX"
                      variant="outlined"
                      fullWidth
                      value={`R$ ${pixValue.toFixed(2)}`}
                      sx={{ mt: 2 }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      label="Valor no Cartão"
                      variant="outlined"
                      fullWidth
                      value={`R$ ${creditCardValue.toFixed(2)}`}
                      sx={{ mt: 2 }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" color="textSecondary">
                      Insira os dados do cartão:
                    </Typography>
                    <TextField
                      label="Número do Cartão"
                      variant="outlined"
                      fullWidth
                      sx={{ mt: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CreditCardIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={6}>
                        <TextField
                          label="Mês Validade"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Ano Validade"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField label="CVV" variant="outlined" fullWidth />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Nome do Titular"
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

                {/* 2 Cartões de Crédito */}
                <FormControlLabel
                  value="two_cards"
                  control={<Radio />}
                  label="2 Cartões Crédito - MP"
                />
                {paymentMethod === "two_cards" && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      Insira os dados dos dois cartões:
                    </Typography>
                    <TextField
                      label="Valor no 1º Cartão"
                      variant="outlined"
                      fullWidth
                      sx={{ mt: 2 }}
                    />
                    <TextField
                      label="Valor no 2º Cartão"
                      variant="outlined"
                      fullWidth
                      sx={{ mt: 2 }}
                    />
                  </Box>
                )}
              </RadioGroup>
            </CardContent>
          </Card>
        </Grid>

        {/* Resumo do Pedido */}
        <Grid item xs={12} md={4}>
          <Box className="payment-summary">
            <Typography variant="h6">Resumo do Pedido</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">
              Subtotal: R$ {subtotal.toFixed(2)}
            </Typography>
            <Typography variant="body1">
              Frete: R$ {freight.toFixed(2)}
            </Typography>
            <Typography variant="body1" color="success">
              Desconto (à vista): -R$ {discount.toFixed(2)}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Total: R$ {total.toFixed(2)}</Typography>
            <Divider sx={{ my: 2 }} />
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleContinueToReview}
              sx={{ mt: 2 }}
            >
              Salvar & Continuar para Revisão
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              href="/checkout"
              sx={{ mt: 2 }}
            >
              Voltar para o Endereço
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentPage;
