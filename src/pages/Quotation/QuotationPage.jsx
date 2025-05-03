import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import "./QuotationPage.css";

/**
 * @file QuotationPage.jsx
 * @description
 * Página de solicitação de orçamento.
 * @todo Adicionar validação de formulário para garantir que os campos obrigatórios sejam preenchidos corretamente.
 * @todo Implementar lógica para enviar os dados do formulário.
 * @todo Adicionar feedback visual para o usuário após o envio do formulário (ex: mensagem de sucesso ou erro).
 * @todo Implementar lógica para lidar com erros de rede ou falhas no envio do formulário.
 * @todo Adicionar animações ou transições para melhorar a experiência do usuário.
 * @todo Melhorar estilização da página para torná-la mais atraente visualmente.
 * */

const QuotationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    clientType: "fisica", // Pessoa Física ou Jurídica
    companyName: "",
    businessType: "",
    companySize: "",
    contactMethod: "email", // E-mail ou WhatsApp
    email: "",
    whatsapp: "",
    additionalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    alert("Orçamento enviado com sucesso! Entraremos em contato em breve.");
  };

  return (
    <Box className="quotation-page-container">
      <Typography variant="h4" gutterBottom>
        Solicitar Orçamento
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Preencha as informações abaixo para que possamos entrar em contato com você.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Informações Básicas */}
          <Grid item xs={12}>
            <Typography variant="h6">Informações Básicas</Typography>
            <TextField
              label="Nome Completo"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mt: 2 }}
            />
            <RadioGroup
              row
              name="clientType"
              value={formData.clientType}
              onChange={handleChange}
              sx={{ mt: 2 }}
            >
              <FormControlLabel
                value="fisica"
                control={<Radio />}
                label="Pessoa Física"
              />
              <FormControlLabel
                value="juridica"
                control={<Radio />}
                label="Pessoa Jurídica"
              />
            </RadioGroup>
            {formData.clientType === "juridica" && (
              <TextField
                label="Nome da Empresa"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                fullWidth
                sx={{ mt: 2 }}
              />
            )}
          </Grid>

          {/* Detalhes do Negócio */}
          <Grid item xs={12}>
            <Typography variant="h6">Detalhes do Negócio</Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Tipo de Negócio</InputLabel>
              <Select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
              >
                <MenuItem value="restaurante">Restaurante</MenuItem>
                <MenuItem value="loja">Loja</MenuItem>
                <MenuItem value="escritorio">Escritório</MenuItem>
                <MenuItem value="outro">Outro</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Tamanho da Empresa</InputLabel>
              <Select
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
              >
                <MenuItem value="pequena">Pequena</MenuItem>
                <MenuItem value="media">Média</MenuItem>
                <MenuItem value="grande">Grande</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Detalhes do Contato */}
          <Grid item xs={12}>
            <Typography variant="h6">Detalhes do Contato</Typography>
            <RadioGroup
              row
              name="contactMethod"
              value={formData.contactMethod}
              onChange={handleChange}
              sx={{ mt: 2 }}
            >
              <FormControlLabel
                value="email"
                control={<Radio />}
                label="E-mail"
              />
              <FormControlLabel
                value="whatsapp"
                control={<Radio />}
                label="WhatsApp"
              />
            </RadioGroup>
            {formData.contactMethod === "email" && (
              <TextField
                label="E-mail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                sx={{ mt: 2 }}
              />
            )}
            {formData.contactMethod === "whatsapp" && (
              <TextField
                label="Número do WhatsApp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                fullWidth
                sx={{ mt: 2 }}
              />
            )}
          </Grid>

          {/* Mensagem Adicional */}
          <Grid item xs={12}>
            <Typography variant="h6">Mensagem Adicional</Typography>
            <TextField
              label="Informações Adicionais"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              sx={{ mt: 2 }}
            />
          </Grid>

          {/* Botão de Envio */}
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
            >
              Enviar Orçamento
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default QuotationPage;