import { useState } from 'react';
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
  styled,
  Snackbar,
  Alert
} from '@mui/material';
import { useForm } from '../../hook/useForm';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';

const NervCadastroContainer = styled(Container)(({ theme }) => ({
  background: `linear-gradient(180deg, #0a0a12 0%, #1a1a2e 100%)`,
  minHeight: '100vh',
  py: 6,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `repeating-linear-gradient(
      0deg,
      transparent,
      transparent 1px,
      rgba(0, 255, 157, 0.05) 1px,
      rgba(0, 255, 157, 0.05) 2px
    )`,
    pointerEvents: 'none'
  }
}));

const NervCadastroButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Orbitron', sans-serif",
  background: `linear-gradient(45deg, ${theme.palette.nge.purple} 0%, ${theme.palette.nge.red} 100%)`,
  boxShadow: `0 0 15px ${theme.palette.nge.red}`,
  border: `2px solid ${theme.palette.nge.purple}`,
  backdropFilter: 'blur(10px)',
  color: 'white',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  borderRadius: 0,
  padding: '12px 24px',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.nge.red} 0%, ${theme.palette.nge.purple} 100%)`,
    boxShadow: `0 0 15px ${theme.palette.nge.purple}`
  }
}));

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

const cadastroFields = [
  { name: 'primeiro_nome', label: 'PRIMEIRO NOME', type: 'text' },
  { name: 'ultimo_nome', label: 'ÚLTIMO NOME', type: 'text' },
  { name: 'tipoDocumento', label: 'TIPO DE DOCUMENTO', type: 'select', options: ['cpf', 'cnpj'] },
  { name: 'documento', label: 'DOCUMENTO', type: 'text' },
  { name: 'email', label: 'E-MAIL', type: 'email' },
  { name: 'senha', label: 'SENHA', type: 'password' },
  { name: 'confirmarSenha', label: 'CONFIRMAR SENHA', type: 'password' },
  { name: 'termos', label: 'ACEITO OS TERMOS DE USO', type: 'checkbox' },
];

const initialState = Object.fromEntries(cadastroFields.map(f => [f.name, f.type === 'checkbox' ? false : '']));

export default function Cadastro() {
  const theme = useTheme();
  const { formData, handleChange } = useForm(initialState);

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');
  const navigate = useNavigate();

  // Validação de cada campo
  const validateField = (name, value) => {
    let error = '';
    if (name === 'primeiro_nome' && !value.trim()) error = 'Informe o primeiro nome';
    if (name === 'ultimo_nome' && !value.trim()) error = 'Informe o último nome';
    if (name === 'email' && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) error = 'E-mail inválido';
    if (name === 'senha' && value.length < 6) error = 'Mínimo 6 caracteres';
    if (name === 'confirmarSenha' && value !== formData.senha) error = 'Senhas não coincidem';
    if (name === 'tipoDocumento' && !value) error = 'Selecione o tipo de documento';
    if (name === 'documento') {
      if (formData.tipoDocumento === 'cpf' && !/^\d{11}$/.test(value)) error = 'CPF deve ter 11 dígitos';
      if (formData.tipoDocumento === 'cnpj' && !/^\d{14}$/.test(value)) error = 'CNPJ deve ter 14 dígitos';
    }
    if (name === 'termos' && !value) error = 'Você deve aceitar os termos';
    return error;
  };

  // Validação geral
  const validateAll = () => {
    const newErrors = {};
    for (const field of cadastroFields) {
      const value = formData[field.name];
      const error = validateField(field.name, value);
      if (error) newErrors[field.name] = error;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Ao digitar, valida o campo
  const handleFieldChange = (e) => {
    handleChange(e);
    const { name, value, checked, type } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, fieldValue)
    }));
  };

  // Ao enviar, valida tudo
  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitError('');
    if (!validateAll()) {
      setSubmitError('Por favor, corrija os campos destacados.');
      setAlertMsg('Por favor, corrija os campos destacados.');
      setAlertSeverity('error');
      setAlertOpen(true);
      return;
    }
    try {
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
      setAlertMsg('Cadastro realizado com sucesso!');
      setAlertSeverity('success');
      setAlertOpen(true);
      navigate('/login');
    } catch (err) {
      console.error('ERRO NO CADASTRO:', err);
      setSubmitError('Falha no registro. Tente novamente.');
      setAlertMsg('Falha no registro. Tente novamente.');
      setAlertSeverity('error');
      setAlertOpen(true);
    }
  };

  return (
    <NervCadastroContainer maxWidth="sm">
      <Box mt={4} mb={4}>
        <Typography variant="h3" sx={{
          fontFamily: "'Orbitron', sans-serif",
          color: theme.palette.nge.neonGreen,
          mb: 4,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: 0,
            width: '100px',
            height: '3px',
            background: theme.palette.nge.red
          }
        }}>
          /// REGISTRO NERV
        </Typography>
        {submitError && (
          <Box sx={{ mb: 2, color: theme.palette.nge.red, fontFamily: "'Orbitron', sans-serif" }}>
            {submitError}
          </Box>
        )}
        <form onSubmit={handleSubmit} error={!!submitError}> 
          <Grid container spacing={3}>
            {cadastroFields.map(field => (
              <Grid item xs={12} key={field.name}>
                {field.type === 'select' ? (
                  <TextField
                    select
                    fullWidth
                    label={field.label}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleFieldChange}
                    required
                    error={!!errors[field.name]}
                    helperText={errors[field.name]}
                    sx={{
                      '& label': {
                        color: errors[field.name] ? theme.palette.nge.red : theme.palette.nge.neonGreen,
                        fontFamily: "'Orbitron', sans-serif"
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: errors[field.name] ? theme.palette.nge.red : theme.palette.nge.purple
                        },
                        '&:hover fieldset': {
                          borderColor: errors[field.name] ? theme.palette.nge.red : theme.palette.nge.neonGreen
                        }
                      }
                    }}
                  >
                    {field.options.map(opt => (
                      <MenuItem
                        key={opt}
                        value={opt}
                        sx={{
                          fontFamily: "'Rajdhani', sans-serif",
                          background: theme.palette.nge.dark
                        }}
                      >
                        {opt.toUpperCase()}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : field.type === 'checkbox' ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={field.name}
                        checked={formData[field.name]}
                        onChange={handleFieldChange}
                        sx={{
                          color: errors[field.name] ? theme.palette.nge.red : theme.palette.nge.neonGreen,
                          '&.Mui-checked': {
                            color: errors[field.name] ? theme.palette.nge.red : theme.palette.nge.red
                          }
                        }}
                      />
                    }
                    label={
                      <Typography sx={{
                        fontFamily: "'Orbitron', sans-serif",
                        color: errors[field.name] ? theme.palette.nge.red : theme.palette.nge.neonGreen,
                        fontSize: '0.8rem'
                      }}>
                        {field.label}
                      </Typography>
                    }
                  />
                ) : (
                  <TextField
                    fullWidth
                    type={field.type}
                    label={field.label}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleFieldChange}
                    required
                    error={!!errors[field.name]}
                    helperText={errors[field.name]}
                    sx={{
                      '& label': {
                        color: errors[field.name] ? theme.palette.nge.red : theme.palette.nge.neonGreen,
                        fontFamily: "'Orbitron', sans-serif"
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: errors[field.name] ? theme.palette.nge.red : theme.palette.nge.purple
                        },
                        '&:hover fieldset': {
                          borderColor: errors[field.name] ? theme.palette.nge.red : theme.palette.nge.neonGreen
                        }
                      }
                    }}
                  />
                )}
              </Grid>
            ))}
            <Grid item xs={12}>
              <NervCadastroButton
                type="submit"
                fullWidth
              >
                CONFIRMAR REGISTRO
              </NervCadastroButton>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Snackbar
        open={alertOpen}
        autoHideDuration={5000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
          sx={{
            width: '100%',
            fontFamily: "'Orbitron', sans-serif",
            background: alertSeverity === 'error'
              ? theme.palette.nge.red
              : theme.palette.nge.neonGreen,
            color: '#fff',
            letterSpacing: '0.05em',
            boxShadow: `0 0 10px ${theme.palette.nge.purple}`,
          }}
          variant="filled"
        >
          {alertMsg}
        </Alert>
      </Snackbar>
    </NervCadastroContainer>
  );
}