import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";

/* 
  Arquivo de rotas base.
  Aqui, você pode adicionar suas páginas conforme necessário.
*/

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Exemplo de rota inicial */}
        <Route path="/Listar_totens" element={<Header />} />
      </Routes>
    </Router>
  );
};

export default AppRouter; //1 por pagina 
