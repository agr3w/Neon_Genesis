import React, { useState } from "react";
import { Box, Grid, Typography, Button, styled, Chip, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { useParams } from "react-router";
import totensData from "../../data/totemData";
import { useCart } from "../../context/CartContext";
import { useTheme } from "@mui/material/styles";

const NervDetailButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Orbitron', sans-serif",
  background: 'linear-gradient(45deg, #7d26cd 0%, #ff0033 100%)',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '0',
  border: 'none',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  transition: 'all 0.3s',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 5px 15px ${theme.palette.nge.red}`,
    '&::before': {
      left: '100%'
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'all 0.5s'
  }
}));

const TotemDetail = ({ type }) => {
  const theme = useTheme();
  const { id } = useParams();
  const totem = totensData.find((t) => t.id === Number(id));
  const { addToCart } = useCart();
  const [openModal, setOpenModal] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  if (!totem) {
    return (
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.nge.dark
      }}>
        <Typography variant="h5" sx={{ color: theme.palette.nge.red }}>
          /// UNIDADE NÃO ENCONTRADA
        </Typography>
      </Box>
    );
  }

  const handleAction = () => {
    if (type === "locacao") {
      setOpenModal(true);
    } else {
      addToCart(totem);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNome("");
    setEmail("");
    setMensagem("");
    setEnviando(false);
    setSucesso(false);
  };

  const handleEnviarLocacao = async () => {
    if (!nome.trim() || !email.trim() || !mensagem.trim()) {
      alert("Preencha todos os campos para enviar a solicitação.");
      return;
    }
    if (sucesso) return;
    setEnviando(true);
    try {
      await fetch("http://localhost:3001/locacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          mensagem,
          totemId: totem.id,
          totemName: totem.name
        })
      });
      setSucesso(true);
    } catch (err) {
      alert("Erro ao enviar solicitação. Tente novamente.");
    }
    setEnviando(false);
  };

  return (
    <Box sx={{
      p: 4,
      margin: '80px auto auto auto',
      background: 'linear-gradient(135deg, #0a0a12 0%, #1a1a2e 100%)',
      minHeight: '100vh'
    }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Box sx={{
            border: `3px solid ${theme.palette.nge.purple}`,
            p: 2,
            background: '#0a0a12',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0, 255, 157, 0.05) 5px, rgba(0, 255, 157, 0.05) 10px)',
              pointerEvents: 'none'
            }
          }}>
            <Box
              component="img"
              src={totem.image}
              sx={{
                width: '100%',
                height: '400px', //Mudar para ficar de acordo
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 10px rgba(0, 255, 157, 0.3))'
              }}
            />
            <Chip
              label={`ID: ${totem.id}`}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: theme.palette.nge.red,
                color: 'white',
                fontFamily: "'Orbitron', sans-serif"
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{
            color: 'white',
            '& h1': {
              fontFamily: "'Orbitron', sans-serif",
              color: theme.palette.nge.neonGreen,
              mb: 3,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: 0,
                width: '50px',
                height: '3px',
                background: theme.palette.nge.red
              }
            }
          }}>
            <Typography variant="h2" component="h1">
              {totem.name}
            </Typography>

            <Typography variant="h3" sx={{
              color: theme.palette.nge.red,
              mb: 3,
              fontFamily: "'Orbitron', sans-serif"
            }}>
              R$ {totem.price.toFixed(2)}
            </Typography>

            <Typography variant="body1" paragraph sx={{
              fontFamily: "'Rajdhani', sans-serif",
              lineHeight: 1.7,
              mb: 4
            }}>
              {totem.description}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <NervDetailButton onClick={handleAction}>
                {type === "locacao" ? "SOLICITAR LOCAÇÃO" : "ADICIONAR AO CARRINHO"}
              </NervDetailButton>
            </Box>

            {/* Modal de Solicitação de Locação */}
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
              <DialogTitle sx={{
                fontFamily: "'Orbitron', sans-serif",
                color: theme.palette.nge.neonGreen,
                borderBottom: `1px solid ${theme.palette.nge.purple}`,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Solicitar Locação do Equipamento
              </DialogTitle>
              <DialogContent>
                {sucesso ? (
                  <Typography sx={{ color: theme.palette.nge.neonGreen, fontFamily: "'Rajdhani', sans-serif", mt: 2 }}>
                    Solicitação enviada com sucesso! Em breve entraremos em contato por e-mail.
                  </Typography>
                ) : (
                  <>
                    <Typography sx={{ color: "white", fontFamily: "'Rajdhani', sans-serif", mt: 2, fontSize: '1.1rem' }}>
                      Preencha os campos abaixo para solicitar a locação do equipamento:
                    </Typography>
                    <TextField
                      label="Nome"
                      fullWidth
                      sx={{ mt: 2 }}
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                      InputProps={{ sx: { fontFamily: "'Rajdhani', sans-serif" } }}
                    />
                    <TextField
                      label="E-mail para contato"
                      fullWidth
                      sx={{ mt: 2 }}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      type="email"
                      InputProps={{ sx: { fontFamily: "'Rajdhani', sans-serif" } }}
                    />
                    <TextField
                      label="Mensagem"
                      fullWidth
                      multiline
                      minRows={3}
                      sx={{ mt: 2 }}
                      value={mensagem}
                      onChange={e => setMensagem(e.target.value)}
                      InputProps={{ sx: { fontFamily: "'Rajdhani', sans-serif" } }}
                    />
                  </>
                )}
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 2 }}>
                {sucesso ? (
                  <Button
                    variant="contained"
                    sx={{
                      background: theme.palette.nge.neonGreen,
                      color: theme.palette.nge.dark,
                      fontFamily: "'Orbitron', sans-serif"
                    }}
                    onClick={handleCloseModal}
                  >
                    FECHAR
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleCloseModal}
                      sx={{
                        color: theme.palette.nge.red,
                        fontFamily: "'Orbitron', sans-serif"
                      }}
                      disabled={enviando}
                    >
                      CANCELAR
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        background: theme.palette.nge.neonGreen,
                        color: theme.palette.nge.dark,
                        fontFamily: "'Orbitron', sans-serif"
                      }}
                      onClick={handleEnviarLocacao}
                      disabled={enviando || !nome.trim() || !email.trim() || !mensagem.trim() || sucesso}
                    >
                      {enviando ? "ENVIANDO..." : "ENVIAR SOLICITAÇÃO"}
                    </Button>
                  </>
                )}
              </DialogActions>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TotemDetail;