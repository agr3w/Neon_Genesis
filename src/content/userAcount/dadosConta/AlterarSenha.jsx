
// filepath: src/content/userAcount/dadosConta/AlterarSenha.jsx
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import axios from "axios";

export default function AlterarSenha({ userId, onClose }) {
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
      setErro("As senhas não coincidem.");
      return;
    }
    try {
      await axios.put(`http://localhost:3001/users/${userId}/senha`, {
        senhaAtual,
        novaSenha,
      });
      setMsg("Senha alterada com sucesso!");
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmar("");
      if (onClose) setTimeout(onClose, 1500);
    } catch (err) {
      setErro(err.response?.data?.error || "Erro ao alterar senha.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="subtitle1" mb={1}>Alterar Senha</Typography>
      <TextField
        label="Senha Atual"
        type="password"
        fullWidth
        margin="dense"
        value={senhaAtual}
        onChange={e => setSenhaAtual(e.target.value)}
        required
      />
      <TextField
        label="Nova Senha"
        type="password"
        fullWidth
        margin="dense"
        value={novaSenha}
        onChange={e => setNovaSenha(e.target.value)}
        required
      />
      <TextField
        label="Confirmar Nova Senha"
        type="password"
        fullWidth
        margin="dense"
        value={confirmar}
        onChange={e => setConfirmar(e.target.value)}
        required
      />
      {erro && <Alert severity="error" sx={{ mt: 1 }}>{erro}</Alert>}
      {msg && <Alert severity="success" sx={{ mt: 1 }}>{msg}</Alert>}
      <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>
        Salvar Nova Senha
      </Button>
      {onClose && (
        <Button onClick={onClose} sx={{ mt: 2, ml: 2 }}>
          Cancelar
        </Button>
      )}
    </Box>
  );
}