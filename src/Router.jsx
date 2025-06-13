import React, { useEffect, useState, Suspense } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import LoadingOverlay from "./components/loadingOverlay/LoadingOverlay";
import { Route, Routes } from "react-router";
import useScrollToTop from "./hook/useScrollToTop";
import { GlobalStyles } from '@mui/material';
import NotFound from "./pages/notFound/NotFound";

// Troque estes imports:
const Login = React.lazy(() => import("./pages/login/LoginRender"));
const Home = React.lazy(() => import("./pages/home/Home"));
const Cadastro = React.lazy(() => import("./components/Cadastro/Cadastro"));
const TotensListRender = React.lazy(() => import("./pages/totensList/TotensListRender"));
const CartPage = React.lazy(() => import("./pages/Cart/CartPage"));
const CheckoutPage = React.lazy(() => import("./pages/checkout/CheckoutPage"));
const PaymentPage = React.lazy(() => import("./pages/payment/PaymentPage"));
const ReviewPage = React.lazy(() => import("./pages/review/ReviewPage"));
const RentalTotensList = React.lazy(() => import("./content/QuotationScreen/RentalTotensList/RentalTotensList"));
const TotemDetailRender = React.lazy(() => import("./pages/totemDetail/TotemDetailRender"));
const UserAcount = React.lazy(() => import("./content/userAcount/UserAcount"));
const Sobre = React.lazy(() => import("./pages/sobre/Sobre"));
const Servicos = React.lazy(() => import("./pages/servicos/Servicos"));

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
  const location = useLocation();

  return (
    <>
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

      <Suspense fallback={<LoadingOverlay />}>
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
          <Route path="/orçamento" element={<RentalTotensList />} />
          <Route path="/locacao/:id" element={<TotemDetailRender />} />
          <Route path="/user" element={<UserAcount />} />
          <Route path="/Sobre" element={<Sobre />} />
          <Route path="/Serviços" element={<Servicos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRouter;
