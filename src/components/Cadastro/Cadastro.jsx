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
  styled
} from '@mui/material';
import { useForm } from '../../hook/useForm';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

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

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert('AS SENHAS NÃO COINCIDEM!');
      return;
    }
    if (!formData.termos) {
      alert('VOCÊ DEVE ACEITAR OS TERMOS.');
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
      console.log('USUÁRIO REGISTRADO:', res.data);
    } catch (err) {
      console.error('ERRO NO CADASTRO:', err);
      alert('FALHA NO REGISTRO.');
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
        
        <form onSubmit={handleSubmit}>
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
                    onChange={handleChange} 
                    required
                    sx={{
                      '& label': {
                        color: theme.palette.nge.neonGreen,
                        fontFamily: "'Orbitron', sans-serif"
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: theme.palette.nge.purple
                        },
                        '&:hover fieldset': {
                          borderColor: theme.palette.nge.neonGreen
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
                        onChange={handleChange}
                        sx={{
                          color: theme.palette.nge.neonGreen,
                          '&.Mui-checked': {
                            color: theme.palette.nge.red
                          }
                        }}
                      />
                    }
                    label={
                      <Typography sx={{
                        fontFamily: "'Orbitron', sans-serif",
                        color: theme.palette.nge.neonGreen,
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
                    onChange={handleChange} 
                    required
                    sx={{
                      '& label': {
                        color: theme.palette.nge.neonGreen,
                        fontFamily: "'Orbitron', sans-serif"
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: theme.palette.nge.purple
                        },
                        '&:hover fieldset': {
                          borderColor: theme.palette.nge.neonGreen
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
    </NervCadastroContainer>
  );
}
