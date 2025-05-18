import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
  Grid,
  Box,
  MenuItem,
} from '@mui/material';
import { useForm } from '../../hook/useForm';
import axios from 'axios';

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

const cadastroFields = [
  { name: 'primeiro_nome', label: 'Primeiro Nome', type: 'text' },
  { name: 'ultimo_nome', label: 'Último Nome', type: 'text' },
  { name: 'tipoDocumento', label: 'Tipo de Documento', type: 'select', options: ['cpf', 'cnpj'] },
  { name: 'documento', label: 'Documento', type: 'text' },
  { name: 'email', label: 'E-mail', type: 'email' },
  { name: 'senha', label: 'Senha', type: 'password' },
  { name: 'confirmarSenha', label: 'Confirmar Senha', type: 'password' },
  { name: 'termos', label: 'Aceito os termos de uso', type: 'checkbox' },
];

const initialState = Object.fromEntries(cadastroFields.map(f => [f.name, f.type === 'checkbox' ? false : '']));

export default function Cadastro() {
  const { formData, handleChange } = useForm(initialState);

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    if (!formData.termos) {
      alert('Você deve aceitar os termos.');
      return;
    }
    try {
      // Envie apenas os campos necessários para o backend
      const payload = {
        primeiro_nome: formData.primeiro_nome,
        ultimo_nome: formData.ultimo_nome,
        tipoDocumento: formData.tipoDocumento,
        documento: formData.documento,
        email: formData.email,
        senha: formData.senha,
        termos: formData.termos,
      };
      const res = await axios.post('http://localhost:3001/users', payload);
      console.log('Cliente criado:', res.data);
      // possível redirecionamento...
    } catch (err) {
      console.error('Erro ao cadastrar:', err);
      alert('Falha no cadastro.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={4}>
        <Typography variant="h4">Cadastro de Cliente</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {cadastroFields.map(field => (
              <Grid item xs={12} key={field.name}>
                {field.type === 'select' ? (
                  <TextField
                    select fullWidth label={field.label}
                    name={field.name} value={formData[field.name]}
                    onChange={handleChange} required
                  >
                    {field.options.map(opt => (
                      <MenuItem key={opt} value={opt}>{opt.toUpperCase()}</MenuItem>
                    ))}
                  </TextField>
                ) : field.type === 'checkbox' ? (
                  <FormControlLabel
                    control={<Checkbox name={field.name} checked={formData[field.name]} onChange={handleChange} />}
                    label={field.label}
                  />
                ) : (
                  <TextField
                    fullWidth type={field.type} label={field.label}
                    name={field.name} value={formData[field.name]}
                    onChange={handleChange} required
                  />
                )}
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>Cadastre-se</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}