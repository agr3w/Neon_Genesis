import React, { useEffect, useState } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import LoadingOverlay from "./components/loadingOverlay/LoadingOverlay";
import { Route, Routes } from "react-router";
import Login from "./pages/login/LoginRender";
import Home from "./pages/home/Home";
import Cadastro from "./components/Cadastro/Cadastro";
import TotensListRender from "./pages/totensList/TotensListRender";
import useScrollToTop from "./hook/useScrollToTop";
import CartPage from "./pages/Cart/CartPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import PaymentPage from "./pages/payment/PaymentPage";
import ReviewPage from "./pages/review/ReviewPage";
import RentalTotensList from "./content/QuotationScreen/RentalTotensList/RentalTotensList";
import TotemDetailRender from "./pages/totemDetail/TotemDetailRender";
import UserAcount from "./content/userAcount/UserAcount";
import { GlobalStyles } from '@mui/material';
import Sobre from "./pages/Sobre/Sobre";
import Servicos from "./pages/Servicos/Servicos";

/**
 * @file AppRouter.jsx
 * @description
 * Arquivo de rotas base.
 * Aqui, você pode adicionar suas páginas conforme necessário.
 * As rotas são definidas usando o componente <Routes> do React Router.
 * Cada rota é definida usando o componente <Route>, onde você especifica o caminho (path) e o componente a ser renderizado (element).
 * Você pode adicionar mais rotas conforme necessário, seguindo o mesmo padrão.
 * Certifique-se de que os componentes importados estejam corretos e disponíveis no caminho especificado.
 *  @todo Adicionar lógica para verificar se o usuário está autenticado antes de acessar certas rotas (ex: /checkout, /payment, /review).
 *  @todo Implementar lógica de redirecionamento para a página de login se o usuário não estiver autenticado. 
 *  @todo Adicionar lógica para lidar com erros 404 (página não encontrada) e redirecionar para uma página de erro personalizada.
 *  @todo Implementar lógica para lidar com o estado de carregamento enquanto as rotas estão sendo resolvidas.
 */

const AppRouter = () => {
  useScrollToTop();
  const navigationType = useNavigationType();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    // Simule um pequeno delay para UX, ou aguarde dados/carregamento real
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [location, navigationType]);
  return (
    <>
      {loading && <LoadingOverlay />}
      <GlobalStyles styles={{
        '@font-face': {
          fontFamily: 'Orbitron',
        },
        body: {
          background: 'linear-gradient(45deg, #0a0a12 0%, #1a1a2e 100%)',
          minHeight: '100vh'
        },
        a: {
          textDecoration: 'none'
        },


      }} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/totem/:id" element={<TotemDetailRender />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/totens" element={<TotensListRender />} />
        <Route path="/carrinho" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/orcamento" element={<RentalTotensList />} />
        <Route path="/locacao/:id" element={<TotemDetailRender />} />
        <Route path="/user" element={<UserAcount />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/servicos" element={<Servicos />} />
      </Routes>
    </>
  );
};

export default AppRouter;
