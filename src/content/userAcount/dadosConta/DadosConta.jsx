import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Grid,
  Divider,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import axios from "axios";
import AlterarSenha from "./AlterarSenha";
import { useTheme } from "@mui/material/styles";

const NervTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.nge.purple,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.nge.neonGreen,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.nge.neonGreen,
    },
    color: theme.palette.nge.neonGreen,
    fontFamily: "'Rajdhani', sans-serif",
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.nge.neonGreen,
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '0.9rem',
    '&.Mui-focused': {
      color: theme.palette.nge.neonGreen
    }
  }
}));

const NervButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Orbitron', sans-serif",
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontWeight: 700,
  borderRadius: '0',
  padding: '10px 24px',
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 0 10px currentColor'
  }
}));

const tipos = [
  { value: "cpf", label: "PESSOA FÍSICA" },
  { value: "cnpj", label: "PESSOA JURÍDICA" },
];

function DadosConta({ user }) {
  const theme = useTheme();
  const [form, setForm] = useState({
    primeiro_nome: user.primeiro_nome || "",
    ultimo_nome: user.ultimo_nome || "",
    tipoDocumento: user.tipoDocumento || "cpf",
    documento: user.documento || "",
    email: user.email || "",
  });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    setLoading(true);
    axios
      .put(`http://localhost:3001/users/${user.id}`, form)
      .then(() => setEdit(false))
      .finally(() => setLoading(false));
  }

  return (
    <Box p={3} sx={{
      background: '#0a0a12',
      border: '2px solid',
      borderImage: 'linear-gradient(45deg, #7d26cd, #ff0033) 1',
      borderRadius: '4px',
      boxShadow: '0 0 15px rgba(0, 255, 157, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Efeito de scanlines mais sutil */}
      <Box sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `repeating-linear-gradient(
          0deg,
          rgba(0, 255, 157, 0.03) 0px,
          rgba(0, 255, 157, 0.03) 1px,
          transparent 2px,
          transparent 3px
        )`,
        pointerEvents: 'none',
        mixBlendMode: 'screen'
      }} />

      <Typography variant="h4" sx={{ 
        mb: 3,
        fontFamily: "'Orbitron', sans-serif",
        background: 'linear-gradient(45deg, #00ff9d, #00a1ff)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        position: 'relative',
        textAlign: 'center'
      }}>
        MEUS DADOS
      </Typography>
      
      <Divider sx={{ 
        mb: 3,
        borderColor: theme.palette.nge.purple,
        borderBottomWidth: '2px'
      }} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <NervTextField
            label="PRIMEIRO NOME"
            name="primeiro_nome"
            value={form.primeiro_nome}
            onChange={handleChange}
            fullWidth
            disabled={!edit}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <NervTextField
            label="ÚLTIMO NOME"
            name="ultimo_nome"
            value={form.ultimo_nome}
            onChange={handleChange}
            fullWidth
            disabled={!edit}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <NervTextField
            select
            label="CADASTRADO COMO"
            name="tipoDocumento"
            value={form.tipoDocumento}
            onChange={handleChange}
            fullWidth
            disabled={!edit}
            margin="normal"
          >
            {tipos.map((t) => (
              <MenuItem 
                key={t.value} 
                value={t.value}
                sx={{ 
                  fontFamily: "'Orbitron', sans-serif",
                  background: '#1a1a2e',
                  '&:hover': {
                    background: theme.palette.nge.purple
                  }
                }}
              >
                {t.label}
              </MenuItem>
            ))}
          </NervTextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <NervTextField
            label={form.tipoDocumento === "cpf" ? "CPF" : "CNPJ"}
            name="documento"
            value={form.documento}
            onChange={handleChange}
            fullWidth
            disabled={!edit}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <NervTextField
            label="E-MAIL CADASTRADO"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            disabled={!edit}
            margin="normal"
          />
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        {!edit ? (
          <>
            <NervButton
              variant="contained"
              onClick={() => setEdit(true)}
              sx={{
                background: 'linear-gradient(45deg, #7d26cd, #ff0033)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #ff0033, #7d26cd)',
                  boxShadow: `0 0 10px ${theme.palette.nge.red}`
                }
              }}
            >
              EDITAR DADOS
            </NervButton>
            <NervButton
              variant="outlined"
              sx={{
                border: `2px solid ${theme.palette.nge.neonGreen}`,
                color: theme.palette.nge.neonGreen,
                '&:hover': {
                  borderColor: theme.palette.nge.red,
                  color: theme.palette.nge.red,
                  boxShadow: `0 0 10px ${theme.palette.nge.neonGreen}`
                }
              }}
              onClick={() => setShowSenha(true)}
            >
              ALTERAR SENHA
            </NervButton>
          </>
        ) : (
          <NervButton
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              background: 'linear-gradient(45deg, #00ff9d, #00a1ff)',
              '&:hover': {
                background: 'linear-gradient(45deg, #00a1ff, #00ff9d)',
                boxShadow: `0 0 10px ${theme.palette.nge.neonGreen}`
              },
              '&:disabled': {
                background: '#232326',
                color: '#555'
              }
            }}
          >
            {loading ? 'ATUALIZANDO...' : 'ATUALIZAR DADOS'}
          </NervButton>
        )}
      </Box>

      {/* Modal de Alterar Senha */}
      <Dialog 
        open={showSenha} 
        onClose={() => setShowSenha(false)}
        PaperProps={{
          sx: {
            background: '#0a0a12',
            border: '2px solid',
            borderImage: 'linear-gradient(45deg, #7d26cd, #ff0033) 1',
            color: theme.palette.nge.neonGreen,
            boxShadow: '0 0 20px rgba(0, 255, 157, 0.5)'
          }
        }}
      >
        <DialogTitle sx={{
          fontFamily: "'Orbitron', sans-serif",
          background: 'linear-gradient(90deg, #0a0a12, #7d26cd)',
          borderBottom: `1px solid ${theme.palette.nge.neonGreen}`,
          color: theme.palette.nge.neonGreen,
          textTransform: 'uppercase',
          textAlign: 'center'
        }}>
          ALTERAR SENHA
        </DialogTitle>
        <DialogContent sx={{ pt: 3, background: '#1a1a2e' }}>
          <AlterarSenha userId={user.id} onClose={() => setShowSenha(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default DadosConta;