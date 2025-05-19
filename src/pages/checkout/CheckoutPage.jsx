// filepath: src/pages/checkout/CheckoutPage.jsx
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
} from "@mui/material";
import {} from "@mui/material";
import EnderecoForm from "../../content/userAcount/enderecos/EnderecoForm";
import axios from "axios";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState(null);
  const [openEnderecoForm, setOpenEnderecoForm] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);

  // Buscar endereços ao entrar na página
  useEffect(() => {
    if (user?.id) {
      axios.get(`http://localhost:3001/enderecos/${user.id}`).then((res) => {
        setAddresses(res.data);
        setAddress(res.data[0] || null);
      });
    }
  }, [user?.id]);

  // Função para salvar novo endereço
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

  const [freightOptions] = useState([
    { label: "DIBASE - CURITIBA (1 a 2 dias úteis)", value: 50.0 },
    { label: "PAC (5 a 10 dias úteis)", value: 25.0 },
    { label: "SEDEX (2 a 4 dias úteis)", value: 38.0 },
  ]);
  const [selectedFreight, setSelectedFreight] = useState(
    freightOptions[0].value
  );

  const handleFreightChange = (e) => setSelectedFreight(Number(e.target.value));

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + selectedFreight;

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
              {addresses.length === 0 ? (
                <>
                  <Typography variant="body2" color="textSecondary">
                    Nenhum endereço cadastrado.
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ mt: 2 }}
                    onClick={() => setOpenEnderecoForm(true)}
                  >
                    Adicionar Endereço de Entrega
                  </Button>
                </>
              ) : address ? (
                <>
                  <Typography variant="body1">
                    {address.nome_destinatario} -{" "}
                    <span className="address-tag">Padrão</span>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {address.endereco}, {address.complemento}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {address.cidade} / {address.estado} - CEP: {address.cep}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2 }}
                    fullWidth
                    onClick={() => setOpenAddressModal(true)}
                  >
                    Alterar Endereço
                  </Button>
                </>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Carregando endereço...
                </Typography>
              )}
            </CardContent>
          </Card>

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
          >
            <DialogTitle>Selecione um Endereço</DialogTitle>
            <DialogContent>
              {addresses.length === 0 ? (
                <Typography>Nenhum endereço cadastrado.</Typography>
              ) : (
                addresses.map((addr) => (
                  <Card
                    key={addr.id}
                    sx={{
                      mb: 2,
                      border:
                        address?.id === addr.id
                          ? "2px solid #1976d2"
                          : "1px solid #ccc",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setAddress(addr);
                      setOpenAddressModal(false);
                    }}
                  >
                    <CardContent>
                      <Typography variant="body1">
                        {addr.nome_destinatario}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {addr.endereco}, {addr.complemento}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {addr.cidade} / {addr.estado} - CEP: {addr.cep}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenAddressModal(false)}>Fechar</Button>
            </DialogActions>
          </Dialog>

          {/* Método de Envio */}
          <Card className="checkout-card" sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6">Método de Envio</Typography>
              <Divider sx={{ my: 2 }} />
              <RadioGroup
                value={selectedFreight}
                onChange={handleFreightChange}
              >
                {freightOptions.map((opt) => (
                  <FormControlLabel
                    key={opt.value}
                    value={opt.value}
                    control={<Radio />}
                    label={`${opt.label} - R$ ${opt.value.toFixed(2)}`}
                  />
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </Grid>

        {/* Resumo do Pedido */}
        <Grid item xs={12} md={4}>
          <Box className="checkout-summary">
            <Typography variant="h6">Resumo do Pedido</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">
              Subtotal: R$ {subtotal.toFixed(2)}
            </Typography>
            <Typography variant="body1">
              Frete: R$ {selectedFreight.toFixed(2)}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Total: R$ {total.toFixed(2)}</Typography>
            <Divider sx={{ my: 2 }} />
            <Button
              variant="contained"
              color="success"
              fullWidth
              href="/payment"
              sx={{ mt: 2 }}
              disabled={!address}
            >
              Continuar para Pagamento
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              href="/carrinho"
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
