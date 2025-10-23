import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  IconButton,
  Box,
  Button,
  styled,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";
import {
  ShoppingCart,
  AccountCircle,
  Menu as MenuIcon
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import logo from '../../assets/logo.png';
import { useTheme } from "@mui/material/styles";

// Componente estilizado para os links de navegação
const NervLink = styled(Button)(({ theme }) => ({
  fontFamily: "'Orbitron', sans-serif",
  color: theme.palette.nge.neonGreen,
  textTransform: 'uppercase',
  position: 'relative',
  '&:hover': {
    color: theme.palette.nge.hoverBlue,
    backgroundColor: 'transparent',
    '&::before': {
      content: '"▸"',
      position: 'absolute',
      left: '-20px',
      color: theme.palette.nge.red
    }
  }
}));

// Componente estilizado para os ícones
const NervIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.nge.neonGreen,
  '&:hover': {
    color: theme.palette.nge.hoverBlue,
    filter: 'drop-shadow(0 0 5px var(--nge-hover-blue))'
  }
}));

const Header = () => {
  const theme = useTheme();
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { label: "Totens", to: "/totens" },
    { label: "Orçamento", to: "/orçamento" }
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        background: (theme) => theme.palette.nge.dark,
        borderBottom: '2px solid',
        borderColor: (theme) => theme.palette.nge.purple,
        boxShadow: '0 0 15px var(--nge-neon-green)'
      }}
    >
      <Toolbar sx={{
        py: 2,
        justifyContent: 'space-between'
      }}>
        {/* Logo e título - Esquerda */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: 0,
              width: '100%',
              height: '2px',
              background: (theme) => theme.palette.nge.neonGreen,
              transform: 'scaleX(0)',
              transition: 'transform 0.3s'
            },
            '&:hover::after': {
              transform: 'scaleX(1)'
            }
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="NERV LOGO"
            sx={{
              height: 40,
              mr: 2,
              filter: 'drop-shadow(0 0 8px var(--nge-neon-green))'
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Orbitron', sans-serif",
              background: 'linear-gradient(45deg, var(--nge-neon-green), var(--nge-hover-blue))',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 10px rgba(0, 255, 157, 0.5)'
            }}
          >
            NEON GENESIS
          </Typography>
        </Box>

        {/* Links centrais - Navegação */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 6, marginRight: 4 }}>
          {navLinks.map((page) => (
            <NervLink
              key={page.label}
              component={Link}
              to={page.to}
            >
              {page.label}
            </NervLink>
          ))}
        </Box>

        {/* Menu Hamburguer para mobile */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{ ml: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Ícones - Direita */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Badge
            badgeContent={totalItems}
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: (theme) => theme.palette.nge.red,
                fontFamily: "'Orbitron', sans-serif"
              }
            }}
          >
            <NervIcon
              component={Link}
              to="/carrinho"
              size="large"
            >
              <ShoppingCart />
            </NervIcon>
          </Badge>

          <NervIcon
            component={Link}
            to="/user"
            size="large"
          >
            <AccountCircle />
          </NervIcon>
        </Box>
      </Toolbar>

      {/* Drawer Mobile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            background: theme.palette.nge.dark,
            color: theme.palette.nge.neonGreen,
            width: 240,
            boxShadow: `0 0 20px ${theme.palette.nge.neonGreen}`,
            borderLeft: `2px solid ${theme.palette.nge.purple}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }
        }}
      >
        <Box sx={{ flex: 1 }}>
          <List>
            {navLinks.map((page) => (
              <ListItem key={page.label} disablePadding>
                <ListItemButton
                  component={Link}
                  to={page.to}
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    fontFamily: "'Orbitron', sans-serif",
                    color: theme.palette.nge.neonGreen,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    '&:hover': {
                      background: theme.palette.nge.purple,
                      color: theme.palette.nge.hoverBlue,
                      boxShadow: `0 0 10px ${theme.palette.nge.neonGreen}`
                    }
                  }}
                >
                  <ListItemText primary={page.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          py: 2,
          borderTop: `1px solid ${theme.palette.nge.purple}`,
          background: 'rgba(125,38,205,0.08)'
        }}>
          <Badge
            badgeContent={totalItems}
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: theme.palette.nge.red,
                fontFamily: "'Orbitron', sans-serif"
              }
            }}
          >
            <NervIcon
              component={Link}
              to="/carrinho"
              size="large"
              onClick={() => setDrawerOpen(false)}
              sx={{
                color: theme.palette.nge.neonGreen,
                '&:hover': {
                  color: theme.palette.nge.hoverBlue,
                  background: 'transparent',
                  boxShadow: `0 0 10px ${theme.palette.nge.neonGreen}`
                }
              }}
            >
              <ShoppingCart />
            </NervIcon>
          </Badge>
          <NervIcon
            component={Link}
            to="/user"
            size="large"
            onClick={() => setDrawerOpen(false)}
            sx={{
              color: theme.palette.nge.neonGreen,
              '&:hover': {
                color: theme.palette.nge.hoverBlue,
                background: 'transparent',
                boxShadow: `0 0 10px ${theme.palette.nge.neonGreen}`
              }
            }}
          >
            <AccountCircle />
          </NervIcon>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;