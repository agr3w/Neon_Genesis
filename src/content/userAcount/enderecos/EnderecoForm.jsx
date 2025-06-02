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
  styled,
  DialogContentText
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


const estadosBrasil = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const tipos = [
  { value: "entrega", label: "ENTREGA" },
  { value: "cobranca", label: "COBRANÇA" },
];




export default function EnderecoForm({ open, onClose, onSave, initialData }) {
  const theme = useTheme();
  const [form, setForm] = useState({
    tipo: "entrega",
    nome_destinatario: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    telefone: "",
    padrao: false,
  });
  const [errors, setErrors] = useState({});
  const [buscandoCep, setBuscandoCep] = useState(false);

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm({
      tipo: "entrega",
      nome_destinatario: "",
      cep: "",
      endereco: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      telefone: "",
      padrao: false,
    });
    setErrors({});
  }, [initialData, open]);

  // Busca automática de CEP
  useEffect(() => {
    if (form.cep.length === 8) {
      setBuscandoCep(true);
      fetch(`https://viacep.com.br/ws/${form.cep}/json/`)
        .then(res => res.json())
        .then(data => {
          if (!data.erro) {
            setForm(prev => ({
              ...prev,
              endereco: data.logradouro || "",
              bairro: data.bairro || "",
              cidade: data.localidade || "",
              estado: data.uf || "",
            }));
            setErrors(prev => ({ ...prev, cep: undefined }));
          } else {
            setErrors(prev => ({ ...prev, cep: "CEP não encontrado" }));
          }
        })
        .catch(() => setErrors(prev => ({ ...prev, cep: "Erro ao buscar CEP" })))
        .finally(() => setBuscandoCep(false));
    }
  }, [form.cep]);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "cep" && (!/^\d*$/.test(value) || value.length > 8)) return;
    if (name === "telefone" && (!/^\d*$/.test(value) || value.length > 11)) return;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function validate() {
    let newErrors = {};
    if (!form.nome_destinatario) newErrors.nome_destinatario = "Nome obrigatório";
    if (!form.cep || form.cep.length !== 8) newErrors.cep = "CEP deve ter 8 dígitos";
    if (!form.endereco) newErrors.endereco = "Endereço obrigatório";
    if (!form.numero) newErrors.numero = "Número obrigatório";
    if (!form.bairro) newErrors.bairro = "Bairro obrigatório";
    if (!form.cidade) newErrors.cidade = "Cidade obrigatória";
    if (!form.estado) newErrors.estado = "Selecione o estado";
    if (!form.telefone || form.telefone.length < 10) newErrors.telefone = "Telefone deve ter DDD e número";
    return newErrors;
  }

  function isFormValid() {
    const validation = validate();
    return Object.keys(validation).length === 0;
  }

  function handleSubmit() {
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      onSave(form);
    }
  }

  return (
    <NervDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>CADASTRO DE NOVO ENDEREÇO</DialogTitle>
      <DialogContentText sx={{ paddingLeft: 3 }}>Todos os campos são obrigatórios</DialogContentText>
      <DialogContent>
        <Box sx={{ display: 'grid', gap: 2, marginTop: 2 }}>
          <NervTextField
            label="Nome do destinatário"
            name="nome_destinatario"
            value={form.nome_destinatario}
            onChange={handleChange}
            error={!!errors.nome_destinatario}
            helperText={errors.nome_destinatario}
            fullWidth
          />
          <NervTextField
            label="CEP"
            name="cep"
            value={form.cep}
            onChange={handleChange}
            inputProps={{ maxLength: 8, inputMode: "numeric" }}
            error={!!errors.cep}
            helperText={errors.cep || "A busca é automática ao digitar 8 dígitos"}
            fullWidth
            disabled={buscandoCep}
          />
          <NervTextField
            label="Endereço"
            name="endereco"
            value={form.endereco}
            onChange={handleChange}
            error={!!errors.endereco}
            helperText={errors.endereco}
            fullWidth
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <NervTextField
              label="Número"
              name="numero"
              value={form.numero}
              onChange={handleChange}
              error={!!errors.numero}
              helperText={errors.numero}
              fullWidth
            />
            <NervTextField
              label="Complemento"
              name="complemento"
              value={form.complemento}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <NervTextField
            label="Bairro"
            name="bairro"
            value={form.bairro}
            onChange={handleChange}
            error={!!errors.bairro}
            helperText={errors.bairro}
            fullWidth
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <NervTextField
              label="Cidade"
              name="cidade"
              value={form.cidade}
              onChange={handleChange}
              error={!!errors.cidade}
              helperText={errors.cidade}
              fullWidth
            />
            <NervTextField
              select
              label="Estado"
              name="estado"
              value={form.estado}
              onChange={handleChange}
              error={!!errors.estado}
              helperText={errors.estado}
              fullWidth
            >
              {estadosBrasil.map((uf) => (
                <MenuItem key={uf} value={uf}>{uf}</MenuItem>
              ))}
            </NervTextField>
          </Box>
          <NervTextField
            label="Telefone"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            inputProps={{ maxLength: 11, inputMode: "numeric" }}
            error={!!errors.telefone}
            helperText={errors.telefone || "Somente números, com DDD"}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <NervButton onClick={onClose}>Cancelar</NervButton>
        <NervButton
          onClick={handleSubmit}
          variant="contained"
          disabled={!isFormValid()}
          sx={{
            opacity: !isFormValid() ? 0.6 : 1,
            cursor: !isFormValid() ? "not-allowed" : "pointer"
          }}
        >
          Salvar
        </NervButton>
      </DialogActions>
    </NervDialog>
  );
}