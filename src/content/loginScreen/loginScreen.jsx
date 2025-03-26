import { useState } from "react";
import "./Login.css";
import { AppBar, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "../../assets/logo.png";

function Header() {
  return (
    <AppBar position="fixed" className="nav" color="transparent">
      <Toolbar className="toolbar">
        <div className="nav-left">
          <img src={logo} alt="NEON GENESIS" className="nav-logo-img" />
          <Typography variant="h6" className="nav-titulo" fontWeight={600}>
            Neon Genesis
          </Typography>
        </div>
        <ShoppingCartIcon />
      </Toolbar>
    </AppBar>
  );
}

function LoginRegister() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [cpf, setCpf] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneResidential, setPhoneResidential] = useState("");
  const [phoneCell, setPhoneCell] = useState("");

  const handleLogin = () => {
    console.log("Email:", email, "Password:", password);
  };

  const handleRegister = () => {
    console.log("Cadastro:", { fullName, birthDate, cpf, email, password, confirmPassword, phoneResidential, phoneCell });
  };

  return (
    <>
      <Header />
      <div className={`login-container ${isRegistering ? "register-mode" : ""}`}>
        <div className="login-card">
          <h2 className="login-title">{isRegistering ? "Cadastro" : "Login"}</h2>
          {isRegistering ? (
            <>
              <input type="text" placeholder="Nome Completo" value={fullName} onChange={(e) => setFullName(e.target.value)} className="login-input" />
              <input type="date" placeholder="Data de Nascimento" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="login-input" />
              <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} className="login-input" />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" />
              <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
              <input type="password" placeholder="Confirme a Senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="login-input" />
              <input type="text" placeholder="Telefone Residencial" value={phoneResidential} onChange={(e) => setPhoneResidential(e.target.value)} className="login-input" />
              <input type="text" placeholder="Telefone Celular" value={phoneCell} onChange={(e) => setPhoneCell(e.target.value)} className="login-input" />
              <button onClick={handleRegister} className="login-button">Cadastrar</button>
            </>
          ) : (
            <>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" />
              <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
              <button onClick={handleLogin} className="login-button">Entrar</button>
            </>
          )}
          <p className="toggle-text" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Já tem uma conta? Faça login" : "Não tem uma conta? Cadastre-se"}
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginRegister;