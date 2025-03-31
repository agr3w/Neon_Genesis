import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-8">
      <div className="container mx-auto text-center">
        {/* Nome do site */}
        <p className="text-lg font-semibold">Neon Genesis LTDA.</p>

        {/* Links de navegação */}
        <nav className="mt-2">
          <ul className="flex justify-center space-x-4">
            <li><a href="#" className="hover:underline">Início</a></li>
            <li><a href="#" className="hover:underline">Sobre</a></li>
            <li><a href="#" className="hover:underline">Serviços</a></li>
            <li><a href="#" className="hover:underline">Contato</a></li>
          </ul>
        </nav>

        {/* Redes sociais com ícones */}
        <div className="mt-4 flex justify-center space-x-6 text-2xl">
          <a href="#" className="hover:text-gray-400"><FaFacebook /></a>
          <a href="#" className="hover:text-gray-400"><FaTwitter /></a>
          <a href="#" className="hover:text-gray-400"><FaInstagram /></a>
          <a href="#" className="hover:text-gray-400"><FaLinkedin /></a>
        </div>

        {/* Informações adicionais */}
        <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} . Todos os direitos reservados.</p>
        <p className="text-xs mt-2">Desenvolvido por <a href="#" className="hover:underline">Minha Empresa</a></p>
      </div>
    </footer>
  );
};

export default Footer;
