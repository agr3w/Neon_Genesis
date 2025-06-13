import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Typography, 
  Box, 
  Paper, 
  TextField, 
  Button,
  styled 
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../../hook/useAuth";
import { useTheme } from "@mui/material/styles";

const NervLoginContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(135deg, ${theme.palette.nge.dark} 0%, #1a1a2e 100%)`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `radial-gradient(
      circle at 50% 50%,
      rgba(0, 255, 157, 0.1) 0%,
      transparent 70%
    )`,
    pointerEvents: 'none'
  }
}));

const NervLoginPaper = styled(Paper)(({ theme }) => ({
  p: 4,
  borderRadius: 1,
  minWidth: 340,
  background: 'rgba(10, 10, 18, 0.9)',
  border: `2px solid ${theme.palette.nge.purple}`,
  boxShadow: `0 0 20px rgba(125, 38, 205, 0.5)`,
  backdropFilter: 'blur(10px)'
}));

const NervLoginButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Orbitron', sans-serif",
  background: `linear-gradient(45deg, ${theme.palette.nge.red} 0%, ${theme.palette.nge.purple} 100%)`,
  color: 'white',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  borderRadius: 0,
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.nge.purple} 0%, ${theme.palette.nge.red} 100%)`,
    boxShadow: `0 0 15px ${theme.palette.nge.red}`
  }
}));

function LoginScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:3001/login", { email, senha: password });
      login(res.data);
      navigate("/user");
    } catch (err) {
      setError("ACESSO NEGADO - CREDENCIAIS INVÁLIDAS");
    }
  };

  return (
    <NervLoginContainer>
      <NervLoginPaper elevation={24} sx={{ p: 4 }}>
        <Typography variant="h5" sx={{
          fontFamily: "'Orbitron', sans-serif",
          color: theme.palette.nge.neonGreen,
          textAlign: 'center',
          mb: 3,
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          /// AUTENTICAÇÃO REQUERIDA
        </Typography>
        
        <form onSubmit={handleLogin}>
          <TextField
            label="E-MAIL DE ACESSO"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          
          <TextField
            label="SENHA DE ACESSO"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          
          {error && (
            <Typography sx={{ 
              color: theme.palette.nge.red,
              fontFamily: "'Orbitron', sans-serif",
              textAlign: 'center',
              mt: 2,
              fontSize: '0.8rem'
            }}>
              {error}
            </Typography>
          )}
          
          <NervLoginButton
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            CONFIRMAR ACESSO
          </NervLoginButton>
        </form>
        
        <Button
          component={Link}
          to="/cadastro"
          fullWidth
          sx={{
            mt: 1,
            color: theme.palette.nge.neonGreen,
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: '0.05em',
            '&:hover': {
              color: theme.palette.nge.red
            }
          }}
        >
          /// NÃO POSSUI CREDENCIAL?
        </Button>
      </NervLoginPaper>
    </NervLoginContainer>
  );
}

export default LoginScreen;