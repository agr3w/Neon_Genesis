import React from 'react';
import { createRoot } from 'react-dom/client'
import AppRouter from './Router'
import { BrowserRouter } from 'react-router'
import './styles/Variables.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthProvider } from './hook/useAuth';
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from '@mui/material/styles';
import nervTheme from './styles/theme';
import CssBaseline from '@mui/material/CssBaseline';

AOS.init();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <ThemeProvider theme={nervTheme}>
          <CssBaseline /> {/* Normaliza o CSS e aplica o fundo escuro */}
          <AppRouter />
        </ThemeProvider >
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
)
