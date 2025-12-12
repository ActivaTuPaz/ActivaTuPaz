import { MessageCircle, Instagram, Mail, MapPin, Globe } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section contact">
      <div className="container contact-container">
        <h2 className="section-title">Contacto</h2>
        <p className="contact-intro">
          ¿Listo para iniciar tu proceso? Escríbeme directamente.
        </p>

        <div className="contact-actions">
          {/* WhatsApp - Primary Action */}
          <a
            href={`https://wa.me/5492216492754?text=${encodeURIComponent("Hola, vengo de tu página web y queria consultarte algo")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card whatsapp"
          >
            <MessageCircle size={32} className="icon-color" />
            <div className="card-text">
              <h3>WhatsApp</h3>
              <span>+54 9 221 649-2754</span>
            </div>
          </a>

          {/* Instagram - Primary Action */}
          <a
            href="https://www.instagram.com/activatupazinterior?igsh=dzJhd3l1YnR4czJv&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card instagram"
          >
            <Instagram size={32} className="icon-color" />
            <div className="card-text">
              <h3>Instagram</h3>
              <span>@activatupazinterior</span>
            </div>
          </a>
        </div>

        <div className="contact-info">
          <div className="info-item">
            <Mail className="info-icon" size={24} />
            <div className="info-details">
              <h4>Correo Electrónico</h4>
              <a href="mailto:lorenacalcopietro@gmail.com">lorenacalcopietro@gmail.com</a>
            </div>
          </div>

          <div className="info-item">
            <Globe className="info-icon" size={24} />
            <div className="info-details">
              <h4>Atención Virtual</h4>
              <p>A todo el mundo hispanohablante</p>
            </div>
          </div>

          <div className="info-item">
            <MapPin className="info-icon" size={24} />
            <div className="info-details">
              <h4>Atención Presencial</h4>
              <p>La Plata / City Bell, Buenos Aires</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .contact {
          background-color: var(--bg-alt);
        }

        .contact-container {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .contact-intro {
          font-size: 1.1rem;
          margin-bottom: 40px;
          color: var(--text-main);
        }

        .contact-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 50px;
        }

        .contact-card {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          background-color: var(--bg-main);
          padding: 25px;
          border-radius: var(--radius-card);
          box-shadow: var(--shadow-soft);
          text-decoration: none;
          color: var(--text-main);
          border: 1px solid var(--border);
          transition: all 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
          box-shadow: 0 8px 25px rgba(var(--shadow-color), 0.2);
        }

        .contact-card h3 {
          font-size: 1.2rem;
          margin: 0;
          color: var(--text-main);
        }

        .contact-card span {
          display: block;
          font-size: 0.9rem;
          opacity: 0.8;
          margin-top: 5px;
        }

        /* Icon colors */
        .whatsapp .icon-color {
          color: #25D366;
        }
        .instagram .icon-color {
          color: #E1306C;
        }
        
        .whatsapp:hover {
          border-color: #25D366;
        }
        
        .instagram:hover {
           border-color: #E1306C;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 25px;
          background-color: var(--bg-main);
          padding: 30px;
          border-radius: var(--radius-card);
          border: 1px solid var(--border);
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          text-align: left;
        }

        .info-icon {
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 3px;
        }

        .info-details h4 {
          margin: 0 0 5px 0;
          font-size: 1rem;
          color: var(--text-main);
        }

        .info-details p, .info-details a {
          margin: 0;
          color: var(--text-secondary); /* A bit softer */
          font-size: 0.95rem;
          text-decoration: none;
        }
        
        .info-details a:hover {
          color: var(--primary);
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .contact-actions {
            grid-template-columns: 1fr; /* Stack buttons on mobile */
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
