import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Typography, Box, Paper, TextField, Button } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../hook/useAuth";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:3001/login", { email, senha: password }); login(res.data);
      navigate("/user"); // redireciona para a conta do usuário
    } catch (err) {
      setError("Usuário ou senha inválidos.");
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
        }}
      >
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, minWidth: 340 }}>
          <Typography variant="h5" fontWeight={700} align="center" mb={2}>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Senha"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, mb: 1 }}
            >
              Entrar
            </Button>
          </form>
          <Button
            component={Link}
            to="/cadastro"
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
          >
            Não tem uma conta? Cadastre-se
          </Button>
        </Paper>
      </Box>
    </>
  );
}

export default LoginScreen;