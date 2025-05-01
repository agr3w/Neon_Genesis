/**  
  Arquivo de rotas base.
  Aqui, você pode adicionar suas páginas conforme necessário.
*/

import { Route, Routes } from "react-router";
import Login from "./pages/login/LoginRender";
import Home from "./pages/home/Home";
import TotemPageContent from "./pages/totemDetail/TotemPageContent";
import Cadastro from "./components/Cadastro/Cadastro";
import TotensListRender from "./pages/totensList/TotensListRender";
import useScrollToTop from "./hook/useScrollToTop";

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
      </Routes>
    </>
  );
};

export default AppRouter;
