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
} from "@mui/material";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../hook/useAuth";
import axios from "axios";

const ReviewPage = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();

  // Dados do pagamento e endereço vindos do localStorage
  const paymentData = JSON.parse(localStorage.getItem("paymentData") || "{}");
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState(null);
  const [showPix, setShowPix] = useState(false);
  const [showBoleto, setShowBoleto] = useState(false);
  const [numeroPedido, setNumeroPedido] = useState(""); // Adicione este estado

  // Buscar endereços ao entrar na página
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

  // Função para gerar número de pedido único
  function gerarNumeroPedido() {
    const now = new Date();
    return `PED${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now
      .getDate()
      .toString()
      .padStart(2, "0")}-${Math.floor(Math.random() * 900000 + 100000)}`;
  }

  function gerarLinhaDigitavel(numeroPedido) {
    const numero = numeroPedido || "0000000000";
    const base = numero.replace(/\D/g, "") + Date.now();
    return [
      base.slice(0, 10),
      base.slice(10, 20),
      base.slice(20, 30),
      base.slice(30, 40),
      base.slice(40, 47),
    ].join(" ");
  }

  // Função para gerar payload PIX fake
  function gerarPixPayload(numeroPedido, valor, nome = "NEON GENESIS") {
    const numero = numeroPedido || "0000";
    return [
      "000201",
      "26360014BR.GOV.BCB.PIX",
      `52040000`,
      `5303986`,
      `5406${valor.toFixed(2)}`,
      `5802BR`,
      `5913${nome}`,
      `6009Curitiba`,
      `62070503***`,
      `6304${numero.slice(-4)}`,
    ].join("");
  }
  const numero_pedido = gerarNumeroPedido();

  // Handler de confirmação
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

      // Exibe QR Code ou boleto conforme método
      if (paymentData.paymentMethod === "pix") setShowPix(true);
      if (paymentData.paymentMethod === "boleto") setShowBoleto(true);

      clearCart();
    } catch (err) {
      alert("Erro ao finalizar pedido.");
    }
  };

  return (
    <Box className="review-page-container">
      <Typography variant="h4" gutterBottom>
        Revisão e Confirmação do Pedido
      </Typography>
      <Grid container spacing={3}>
        {/* Endereço */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Endereço de Entrega</Typography>
              <Divider sx={{ my: 2 }} />
              {address ? (
                <>
                  <Typography variant="body1">
                    {address.nome_destinatario}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {address.endereco}, {address.complemento}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {address.cidade} / {address.estado} - CEP: {address.cep}
                  </Typography>
                </>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Nenhum endereço selecionado.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Itens do Pedido */}
        <Grid item xs={12} md={8}>
          <Card>
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
      </Grid>

      {/* Resumo e método de pagamento */}
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Resumo do Pedido</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography>Subtotal: R$ {subtotal.toFixed(2)}</Typography>
            <Typography>Frete: R$ {freight.toFixed(2)}</Typography>
            <Typography>Desconto: R$ {discount.toFixed(2)}</Typography>
            <Typography variant="h6">Total: R$ {total.toFixed(2)}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Pagamento</Typography>
            <Typography>
              {paymentData.paymentMethod === "pix" && "PIX"}
              {paymentData.paymentMethod === "boleto" && "Boleto Bancário"}
              {paymentData.paymentMethod === "credit_card" &&
                "Cartão de Crédito"}
              {paymentData.paymentMethod === "credit_card_pix" &&
                "Cartão + PIX"}
              {paymentData.paymentMethod === "nubank" && "Nubank"}
              {paymentData.paymentMethod === "two_cards" && "2 Cartões"}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Botão de confirmação */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          color="success"
          size="large"
          sx={{ mr: 2 }}
          onClick={handleConfirmarPedido}
          disabled={!address}
        >
          Confirmar Pedido
        </Button>
        <Button variant="outlined" color="primary" size="large" href="/payment">
          Voltar para Pagamento
        </Button>
      </Box>

      {/* Modal PIX */}
      <Dialog open={showPix} onClose={() => setShowPix(false)}>
        <DialogTitle>Pagamento via PIX</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Escaneie o QR Code abaixo para pagar seu pedido:
          </Typography>

          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
              gerarPixPayload(
                numero_pedido,
                total,
                user?.primeiro_nome || "NEON GENESIS"
              )
            )}`}
            alt="QR Code PIX"
            style={{ margin: "0 auto" }}
          />

          <Typography variant="caption" sx={{ mt: 2, display: "block" }}>
            Copie e cole o código PIX:
            <br />
            <span style={{ wordBreak: "break-all" }}>
              {gerarPixPayload(
                numero_pedido,
                total,
                user?.primeiro_nome || "NEON GENESIS"
              )}
            </span>
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Número do Pedido:{" "}
            {numero_pedido ? gerarLinhaDigitavel(numero_pedido) : ""}
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Modal Boleto */}
      <Dialog open={showBoleto} onClose={() => setShowBoleto(false)}>
        <DialogTitle>Boleto Bancário</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Linha digitável do boleto:
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "monospace",
              letterSpacing: "2px",
              mb: 2,
              wordBreak: "break-all",
            }}
          >
            {numero_pedido ? gerarLinhaDigitavel(numero_pedido) : ""}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              window.open(
                "https://www.bb.com.br/docs/pub/inst/dwn/BoletoBB.pdf",
                "_blank"
              )
            }
          >
            Visualizar Boleto
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Número do Pedido: {numero_pedido}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ReviewPage;
