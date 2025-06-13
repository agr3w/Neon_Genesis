import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  MenuItem,
  Box,
  styled 
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const NervDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: theme.palette.nge.dark,
    border: '2px solid',
    borderImage: 'linear-gradient(45deg, #7d26cd, #ff0033) 1',
    borderRadius: '4px',
    boxShadow: '0 0 20px rgba(0, 255, 157, 0.5)',
    color: theme.palette.nge.neonGreen
  }
}));

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
  }
}));

const NervButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Orbitron', sans-serif",
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontWeight: 700,
  borderRadius: '0',
  padding: '8px 24px',
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-2px)'
  }
}));

const tipos = [
  { value: "entrega", label: "ENTREGA" },
  { value: "cobranca", label: "COBRANÇA" },
];

export default function EnderecoForm({ open, onClose, onSave, initialData }) {
  const theme = useTheme();
  const [form, setForm] = useState({
    tipo: "entrega",
    nome_destinatario: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    telefone: "",
    padrao: false,
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm({
      tipo: "entrega",
      nome_destinatario: "",
      endereco: "",
      cidade: "",
      estado: "",
      cep: "",
      telefone: "",
      padrao: false,
    });
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    onSave(form);
  }

  return (
    <NervDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{
        fontFamily: "'Orbitron', sans-serif",
        background: 'linear-gradient(90deg, #0a0a12, #7d26cd)',
        color: theme.palette.nge.neonGreen,
        textTransform: 'uppercase',
        borderBottom: '1px solid #00ff9d'
      }}>
        {initialData ? "EDITAR ENDEREÇO" : "NOVO ENDEREÇO"}
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3, background: '#1a1a2e' }}>
        <Box sx={{ display: 'grid', gap: 2, pt: 1 }}>
          <NervTextField
            select
            label="TIPO"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {tipos.map((t) => (
              <MenuItem 
                key={t.value} 
                value={t.value}
                sx={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {t.label}
              </MenuItem>
            ))}
          </NervTextField>
          
          <NervTextField 
            label="NOME DESTINATÁRIO" 
            name="nome_destinatario" 
            value={form.nome_destinatario} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
          
          <NervTextField 
            label="ENDEREÇO" 
            name="endereco" 
            value={form.endereco} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
          
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <NervTextField 
              label="CIDADE" 
              name="cidade" 
              value={form.cidade} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
            />
            
            <NervTextField 
              label="ESTADO" 
              name="estado" 
              value={form.estado} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
            />
          </Box>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <NervTextField 
              label="CEP" 
              name="cep" 
              value={form.cep} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
            />
            
            <NervTextField 
              label="TELEFONE" 
              name="telefone" 
              value={form.telefone} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
            />
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ background: '#1a1a2e', borderTop: '1px solid #7d26cd' }}>
        <NervButton
          onClick={onClose}
          sx={{
            color: theme.palette.nge.red,
            border: `1px solid ${theme.palette.nge.red}`,
            '&:hover': {
              background: theme.palette.nge.red,
              color: '#fff'
            }
          }}
        >
          CANCELAR
        </NervButton>
        <NervButton
          onClick={handleSubmit}
          variant="contained"
          sx={{
            background: 'linear-gradient(45deg, #00ff9d, #00a1ff)',
            '&:hover': {
              background: 'linear-gradient(45deg, #00a1ff, #00ff9d)'
            }
          }}
        >
          SALVAR
        </NervButton>
      </DialogActions>
    </NervDialog>
  );
}