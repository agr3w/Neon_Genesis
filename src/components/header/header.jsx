import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import "./herder.css";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router";

const Header = () => {
  return (
    <AppBar position="fixed" className="header">
      <Toolbar>
        <img src={logo} alt="" className="logo" />

        <Typography variant="h6" className="op1">
          Neon Genesis
        </Typography>

        <div className="botoes">
          <Button className="botao">Suporte</Button>
          <Button className="botao2">compra</Button>
          <Button className="botao">
            <NavLink to="/teste">HOME</NavLink>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
