
/**  
  Arquivo de rotas base.
  Aqui, você pode adicionar suas páginas conforme necessário.
*/

import { Route, Routes } from "react-router";
import Login from "./pages/login/LoginRender";
import Home from "./pages/home/Home";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default AppRouter;