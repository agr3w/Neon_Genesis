
/**  
  Arquivo de rotas base.
  Aqui, você pode adicionar suas páginas conforme necessário.
*/

import { Route, Routes } from "react-router";
import Login from "./pages/login/LoginRender";
import Home from "./pages/home/Home";
import TotemDetail from "./components/totemDetail/TotemDetail"

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/totem/:id" element={<TotemDetail />} />
      </Routes>
    </>
  );
};

export default AppRouter;