import React, { useState } from "react";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  styled 
} from "@mui/material";
import axios from "axios";
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
    '&.Mui-focused': {
      color: theme.palette.nge.neonGreen
    }
  },
  '& .MuiInputBase-input': {
    '&:-webkit-autofill': {
      WebkitBoxShadow: `0 0 0 100px ${theme.palette.nge.dark} inset`,
      WebkitTextFillColor: theme.palette.nge.neonGreen,
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
    transform: 'translateY(-2px)'
  }
}));

const NervAlert = styled(Alert)(({ theme, severity }) => ({
  fontFamily: "'Orbitron', sans-serif",
  letterSpacing: '0.05em',
  background: severity === 'error' 
    ? 'rgba(255, 0, 51, 0.2)' 
    : 'rgba(0, 255, 157, 0.2)',
  border: `1px solid ${severity === 'error' 
    ? theme.palette.nge.red 
    : theme.palette.nge.neonGreen}`,
  color: '#fff'
}));

export default function AlterarSenha({ userId, onClose }) {
  const theme = useTheme();
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [msg, setMsg] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErro("");
    if (novaSenha !== confirmar) {
      setErro("AS SENHAS NÃO COINCIDEM.");
      return;
    }
    try {
      await axios.put(`http://localhost:3001/users/${userId}/senha`, {
        senhaAtual,
        novaSenha,
      });
      setMsg("SENHA ALTERADA COM SUCESSO!");
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmar("");
      if (onClose) setTimeout(onClose, 1500);
    } catch (err) {
      setErro(err.response?.data?.error || "ERRO AO ALTERAR SENHA.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ 
        mb: 3,
        fontFamily: "'Orbitron', sans-serif",
        color: theme.palette.nge.neonGreen,
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
        ALTERAÇÃO DE SENHA
      </Typography>
      
      <NervTextField
        label="SENHA ATUAL"
        type="password"
        fullWidth
        margin="normal"
        value={senhaAtual}
        onChange={e => setSenhaAtual(e.target.value)}
        required
      />
      <NervTextField
        label="NOVA SENHA"
        type="password"
        fullWidth
        margin="normal"
        value={novaSenha}
        onChange={e => setNovaSenha(e.target.value)}
        required
      />
      <NervTextField
        label="CONFIRMAR NOVA SENHA"
        type="password"
        fullWidth
        margin="normal"
        value={confirmar}
        onChange={e => setConfirmar(e.target.value)}
        required
      />
      
      {erro && <NervAlert severity="error" sx={{ mt: 2 }}>{erro}</NervAlert>}
      {msg && <NervAlert severity="success" sx={{ mt: 2 }}>{msg}</NervAlert>}
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <NervButton
          type="submit"
          variant="contained"
          sx={{
            background: 'linear-gradient(45deg, #00ff9d, #00a1ff)',
            '&:hover': {
              background: 'linear-gradient(45deg, #00a1ff, #00ff9d)',
              boxShadow: '0 0 15px rgba(0, 255, 157, 0.5)'
            }
          }}
        >
          SALVAR SENHA
        </NervButton>
        {onClose && (
          <NervButton
            onClick={onClose}
            variant="outlined"
            sx={{
              borderColor: theme.palette.nge.red,
              color: theme.palette.nge.red,
              '&:hover': {
                borderColor: theme.palette.nge.neonGreen,
                color: theme.palette.nge.neonGreen,
                boxShadow: '0 0 15px rgba(255, 0, 51, 0.5)'
              }
            }}
          >
            CANCELAR
          </NervButton>
        )}
      </Box>
    </Box>
  );
}