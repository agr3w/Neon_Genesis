/**
 * Componente de renderização da página de Login.
 * 
 */

import Header from "../../components/header/header";
import LoginScreen from "../../content/loginScreen/loginScreen";

const Login = () => {
  return (
    <>
      {/* Componentes para serem renderizados da pagina Home */}
      <Header />
      <LoginScreen/>
    </>
  );
};

export default Login;
