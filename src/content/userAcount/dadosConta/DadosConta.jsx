import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Grid,
  Divider,
} from "@mui/material";
import axios from "axios";
import AlterarSenha from "./AlterarSenha";

const tipos = [
  { value: "cpf", label: "Pessoa Física" },
  { value: "cnpj", label: "Pessoa Jurídica" },
];

function DadosConta({ user }) {
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
    <Box p={2}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Meus dados
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Primeiro Nome"
            name="primeiro_nome"
            value={form.primeiro_nome}
            onChange={handleChange}
            fullWidth
            disabled={!edit}
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Último Nome"
            name="ultimo_nome"
            value={form.ultimo_nome}
            onChange={handleChange}
            fullWidth
            disabled={!edit}
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Cadastrado como"
            name="tipoDocumento"
            value={form.tipoDocumento}
            onChange={handleChange}
            fullWidth
            disabled={!edit}
            margin="dense"
          >
            {tipos.map((t) => (
              <MenuItem key={t.value} value={t.value}>
                {t.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label={form.tipoDocumento === "cpf" ? "CPF" : "CNPJ"}
            name="documento"
            value={form.documento}
            onChange={handleChange}
            fullWidth
            disabled={!edit}
            margin="dense"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="E-mail Cadastrado"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            disabled={!edit}
            margin="dense"
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, textAlign: "right" }}>
        {!edit ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEdit(true)}
            >
              Editar Dados
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ ml: 2 }}
              onClick={() => setShowSenha(true)}
            >
              Alterar Senha
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            disabled={loading}
          >
            Atualizar Dados
          </Button>
        )}
        {showSenha && (
          <AlterarSenha userId={user.id} onClose={() => setShowSenha(false)} />
        )}
      </Box>
    </Box>
  );
}

export default DadosConta;
