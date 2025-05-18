import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Alert } from "@mui/material";
import axios from "axios";

const tipos = [
  { value: "manutencao", label: "Manutenção" },
  { value: "reposicao", label: "Reposição de Peça" },
  { value: "compra", label: "Problema com Compra" },
  { value: "outro", label: "Outro" },
];

export default function ChamadoForm({ open, onClose, userId, onSuccess }) {
  const [form, setForm] = useState({ tipo: "", titulo: "", mensagem: "" });
  const [msg, setMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    try {
      await axios.post("http://localhost:3001/chamados", {
        user_id: userId,
        tipo: form.tipo,
        titulo: form.titulo,
        mensagem: form.mensagem,
      });
      setMsg("Chamado aberto com sucesso! Entraremos em contato o mais rápido possível.");
      setTimeout(() => {
        setMsg("");
        onSuccess();
        onClose();
      }, 2000);
    } catch {
      setMsg("Erro ao abrir chamado.");
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Abrir Novo Chamado</DialogTitle>
      <DialogContent>
        <TextField
          select
          label="Tipo de Problema"
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          fullWidth
          margin="dense"
        >
          {tipos.map((t) => (
            <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Título"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Explique a situação"
          name="mensagem"
          value={form.mensagem}
          onChange={handleChange}
          fullWidth
          margin="dense"
          multiline
          rows={4}
        />
        {msg && <Alert severity="success" sx={{ mt: 2 }}>{msg}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="success">
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
}