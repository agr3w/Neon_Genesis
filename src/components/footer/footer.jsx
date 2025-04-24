import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Nome do site */}
      <h6>Neon Genesis LTDA.</h6>

      {/* Links de navegação */}
      <nav>
        <div className="footer-nav">
          <a href="#">Início</a>
          <a href="#">Sobre</a>
          <a href="#">Serviços</a>
          <a href="#">Contato</a>
        </div>
      </nav>

      {/* Redes sociais com ícones */}
      <div className="footer-social">
        <a href="#" aria-label="Facebook">
          <FaFacebook />
        </a>
        <a href="#" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="#" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="#" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
      </div>

      {/* Informações adicionais */}
      <p className="footer-text">
        &copy; {new Date().getFullYear()} . Todos os direitos reservados.
      </p>
      <p className="footer-text">
        Desenvolvido por{" "}
        <a href="#" className="footer-link">
          Minha Empresa
        </a>
      </p>
    </footer>
  );
};

export default Footer;
