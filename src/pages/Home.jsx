import Carousel from "../components/carousel/Carousel";
import Header from "../components/header/header";
import MidleSection from "../components/midleSection/MidleSection"

/**
 * Componente de renderização da página Home.
 * Passamos o Header para aparecer na página inteira e em seguida renderizamos o restante dos componentes.
 */

const Home = () => {
  return (
    <>
      {/* Componentes para serem renderizados da pagina Home */}
      <Header />
      <Carousel/>
      <MidleSection />
    </>
  );
};

export default Home;
