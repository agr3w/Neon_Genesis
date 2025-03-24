import Carousel from "../components/carousel/Carousel";
import Header from "../components/header/header";
import MidleSection from "../content/midleSection/MidleSection"
import TotensSection from "../content/totensSection/TotensSection";
import WhyTotemSection from "../content/WhyTotemSection/WhyTotemSection";

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
      <TotensSection />
      {/* Componentes duplicados apenas para exemplo */}
      <TotensSection /> 
      <WhyTotemSection />
    </>
  );
};

export default Home;
