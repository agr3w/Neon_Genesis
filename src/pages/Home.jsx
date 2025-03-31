import Carousel from "../components/carousel/Carousel";
import Header from "../components/header/header";
/**
 * Componente de renderização da página Home.
 * Passamos o Header para aparecer na página inteira e em seguida renderizamos o restante dos componentes.
 */

const Home = () => {
  return (
    <>
      {/* Componentes para serem renderizados da pagina Home */}
      <Header />
      <Carousel />
      <footer />
    </>
  );
};

export default Home;
