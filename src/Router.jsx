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
  return (
    <>
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
      </Routes>
    </>
  );
};

export default AppRouter;
