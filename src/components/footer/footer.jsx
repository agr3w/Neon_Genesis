import React from "react"; 
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./footer.css";

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
          {['Sobre', 'Serviços', 'Contato'].map((link) => (
            <a 
              href={link} 
              key={link}
              style={{
                color: 'var(--nge-purple)',
                textDecoration: 'none',
                position: 'relative',
                '&:hover': {
                  color: 'var(--nge-neon-green)',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    width: '100%',
                    height: '2px',
                    background: 'var(--nge-red)'
                  }
                }
              }}
            >
              {link.toUpperCase()}
            </a>
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
        {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
          <a 
            href="#" 
            key={index}
            style={{
              color: 'var(--nge-purple)',
              transition: 'all 0.3s',
              '&:hover': {
                color: 'var(--nge-red)',
                transform: 'translateY(-3px)',
                filter: 'drop-shadow(0 0 5px var(--nge-neon-green))'
              }
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