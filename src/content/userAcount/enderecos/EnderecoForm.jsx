
// filepath: src/content/userAcount/enderecos/EnderecoForm.jsx
import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";

const tipos = [
  { value: "entrega", label: "Entrega" },
  { value: "cobranca", label: "Cobrança" },
];

export default function EnderecoForm({ open, onClose, onSave, initialData }) {
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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Editar Endereço" : "Novo Endereço"}</DialogTitle>
      <DialogContent>
        <TextField
          select
          label="Tipo"
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
        <TextField label="Nome Destinatário" name="nome_destinatario" value={form.nome_destinatario} onChange={handleChange} fullWidth margin="dense" />
        <TextField label="Endereço" name="endereco" value={form.endereco} onChange={handleChange} fullWidth margin="dense" />
        <TextField label="Cidade" name="cidade" value={form.cidade} onChange={handleChange} fullWidth margin="dense" />
        <TextField label="Estado" name="estado" value={form.estado} onChange={handleChange} fullWidth margin="dense" />
        <TextField label="CEP" name="cep" value={form.cep} onChange={handleChange} fullWidth margin="dense" />
        <TextField label="Telefone" name="telefone" value={form.telefone} onChange={handleChange} fullWidth margin="dense" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="success">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}