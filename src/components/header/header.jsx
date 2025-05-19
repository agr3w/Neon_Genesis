import { AppBar, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import "./herder.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router";
import { useCart } from "../../context/CartContext";
import Badge from "@mui/material/Badge";

/**
 * @file Header.jsx
 * @description
 * Componente retorna o "Navigator" da pagina, onde o cliente
 * pode navagar entre as páginas.
 */

const Header = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="fixed" className="nav" color="transparent">
      <Toolbar className="toolbar">
        {/* Logo e título alinhados à esquerda */}
        <Link to="/" className="link-home">
          <div className="nav-left">
            <img src={logo} alt="NEON GENESIS" className="nav-logo-img" />
            <Typography variant="h6" className="nav-titulo" fontWeight={600}>
              Neon Genesis
            </Typography>
          </div>
        </Link>
        {/* Botões centralizados */}
        <div className="nav-center">
          <Typography className="nav-itens-btn">
            <Link to="/totens">Todos os totens</Link>
          </Typography>
          <Typography className="nav-itens-btn">
            <Link to="/orcamento">Orçamento</Link>
          </Typography>
          <Typography className="nav-itens-btn">
            <Link to="/#">Suporte</Link>
          </Typography>
        </div>

        {/* Carrinho ou outros ícones à direita */}
        <div className="nav-right">
          <Link
            to="/carrinho"
            className="nav-itens-iconCart"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon className="nav-itens-iconCart" />
            </Badge>
          </Link>
          <Link
            to="/user"
            className="nav-itens-iconCart"
            style={{ textDecoration: "none", color: "white" }}
          >
            <AccountCircleIcon className="nav-itens-iconCart" />
          </Link>
          <AnnouncementIcon className="nav-itens-iconCart" />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
