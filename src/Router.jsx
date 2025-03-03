import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* 
  Arquivo de rotas base.
  Aqui, você pode adicionar suas páginas conforme necessário.
*/

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Exemplo de rota inicial */}
        <Route path="/" element={<h1>Bem-vindo ao Template!</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRouter; //1 por pagina 


