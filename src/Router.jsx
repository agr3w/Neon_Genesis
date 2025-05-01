import { Route, Routes } from "react-router";
import Login from "./pages/login/LoginRender";
import Home from "./pages/home/Home";
import TotemPageContent from "./pages/totemDetail/TotemPageContent";
import Cadastro from "./components/Cadastro/Cadastro";
import TotensListRender from "./pages/totensList/TotensListRender";
import useScrollToTop from "./hook/useScrollToTop";
import CartPage from "./pages/Cart/CartPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";

/**
 * @file AppRouter.jsx
 * @description
 * Arquivo de rotas base.
 * Aqui, você pode adicionar suas páginas conforme necessário.
 * As rotas são definidas usando o componente <Routes> do React Router.
 * Cada rota é definida usando o componente <Route>, onde você especifica o caminho (path) e o componente a ser renderizado (element).
 * Você pode adicionar mais rotas conforme necessário, seguindo o mesmo padrão.
 * Certifique-se de que os componentes importados estejam corretos e disponíveis no caminho especificado.
 */

const AppRouter = () => {
  useScrollToTop();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/totem/:id" element={<TotemPageContent />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/totens" element={<TotensListRender />} />
        <Route path="/carrinho" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
