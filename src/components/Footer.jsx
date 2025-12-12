import { Instagram, MessageCircle, Mail, MapPin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container footer-content">

        {/* Socials & Contact */}
        <div className="footer-section">
          <h3>Conectemos</h3>
          <div className="social-icons">
            <a href={`https://wa.me/5492216492754?text=${encodeURIComponent("Hola, vengo de tu página web y queria consultarte algo")}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <MessageCircle size={24} />
            </a>
            <a href="https://www.instagram.com/activatupazinterior?igsh=dzJhd3l1YnR4czJv&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={24} />
            </a>
          </div>
          <div className="contact-mini">
            <p><Mail size={16} /> lorenacalcopietro@gmail.com</p>
            <p><MapPin size={16} /> La Plata / City Bell / Virtual</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-section">
          <button onClick={scrollToTop} className="footer-link-btn">
            Inicio <ArrowUp size={16} />
          </button>
        </div>

        {/* Credits */}
        <div className="footer-bottom">
          <p>&copy; 2025 Lorena Calcopietro. Todos los derechos reservados.</p>
          <p className="developer">
            Desarrollado por <a href="https://wa.me/5493541315119" target="_blank" rel="noopener noreferrer">Franco Zvilling</a>
          </p>
        </div>
      </div>

      <style jsx="true">{`
        .footer {
          background-color: var(--bg-alt);
          padding: 60px 0 20px;
          border-top: 1px solid var(--border);
          color: var(--text-main);
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          text-align: center;
        }

        .footer-section h3 {
          font-size: 1.2rem;
          margin-bottom: 20px;
          color: var(--primary);
        }

        .social-icons {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .social-icons a {
          color: var(--text-main);
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .social-icons a:hover {
          color: var(--primary);
          transform: translateY(-3px);
        }

        .contact-mini p {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 8px 0;
          font-size: 0.95rem;
          opacity: 0.9;
        }

        .footer-link-btn {
          background: transparent;
          border: 1px solid var(--border);
          padding: 10px 20px;
          border-radius: 20px;
          color: var(--text-main);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .footer-link-btn:hover {
          background-color: var(--bg-main);
          border-color: var(--primary);
          color: var(--primary);
        }

        .footer-bottom {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
          width: 100%;
          font-size: 0.85rem;
          opacity: 0.8;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .developer a {
          color: var(--text-main);
          font-weight: 600;
          text-decoration: none;
          border-bottom: 1px dotted var(--primary);
        }

        .developer a:hover {
          color: var(--primary);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
