import React from "react"; 
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./footer.css";

const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Serviços', to: '/servicos' },
  { label: 'Contato', to: '/contato' }
];

const Footer = () => {
  return (
    <footer 
      className="footer"
      style={{
        background: `
          linear-gradient(
            45deg,
            var(--nge-dark) 0%,
            #1a1a2e 100%
          ),
          var(--nge-diagonal-stripes)
        `,
        borderTop: '3px solid var(--nge-red)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Efeito de varredura */}
      <div className="scanline" />

      <h6 style={{
        fontFamily: "'Orbitron', sans-serif",
        color: 'var(--nge-neon-green)',
        textShadow: '0 0 10px var(--nge-neon-green)'
      }}>
        NERV COMMERCE SYSTEM
      </h6>

      <nav>
        <div 
          className="footer-nav"
          style={{
            display: 'flex',
            gap: '2rem',
            margin: '1.5rem 0'
          }}
        >
          {navLinks.map(({ label, to }) => (
            <Link 
              to={to}
              key={label}
              style={{
                color: 'var(--nge-purple)',
                textDecoration: 'none',
                position: 'relative'
              }}
            >
              {label.toUpperCase()}
            </Link>
          ))}
        </div>
      </nav>

<div 
  className="footer-social"
  style={{
    display: 'flex',
    gap: '1.5rem',
    margin: '2rem 0'
  }}
>
  {[
    { icon: FaFacebook, url: "https://www.facebook.com/profile.php?id=61577207644597" },
    { icon: FaTwitter, url: "https://x.com/NeonGenesis2025" },
    { icon: FaInstagram, url: "https://www.instagram.com/neon.genesis2025/" },
    { icon: FaLinkedin, url: "https://www.linkedin.com/in/yuri-miguel-naslaniec-345112254/" }
  ].map(({ icon: Icon, url }, index) => (
    <a 
      href={url}
      key={index}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: 'var(--nge-purple)',
        transition: 'all 0.3s'
      }}
    >
      <Icon size={24} />
    </a>
  ))}
</div>

      <p 
        className="footer-text"
        style={{
          color: 'var(--nge-neon-green)',
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '0.9rem'
        }}
      >
        &copy; {new Date().getFullYear()} ALL SYSTEMS ONLINE
      </p>
    </footer>
  );
};

export default Footer;