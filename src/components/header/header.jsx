import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./herder.css";
import logo from "../../assets/logo.png";

/**
 * Componente retorna
 *  
 */

const Header = () => {
  return (
    <AppBar position="fixed" className="nav" color="transparent">
      <Toolbar className="toolbar">
        {/* Logo e título alinhados à esquerda */}
        <div className="nav-left">
          <img src={logo} alt="NEON GENESIS" className="nav-logo-img" />
          <Typography variant="h6" className="nav-titulo" fontWeight={600}>
            Neon Genesis
          </Typography>
        </div>

        {/* Botões centralizados */}
        <div className="nav-center">
          <Typography className="nav-itens-btn">
            <a href="/teste">Totens Prontos</a>
          </Typography>
          <Typography className="nav-itens-btn">
            <a href="/teste">Orçamento</a>
          </Typography>
          <Typography className="nav-itens-btn">
            <a href="/teste">Suporte</a>
          </Typography>
        </div>

        {/* Carrinho ou outros ícones à direita */}
        <div className="nav-right">
          <ShoppingCartIcon className="nav-itens-iconCart" />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;