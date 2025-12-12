
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import meDark from '../assets/images/me-dark.webp';
import meWhite from '../assets/images/me-white.webp';

const About = ({ theme }) => {
  const [showVideo, setShowVideo] = useState(false);

  const toggleMedia = () => {
    setShowVideo(!showVideo);
  };

  return (
    <section id="about" className="section about">
      <div className="container about-content">
        <div className="about-media-container">
          <div className="media-wrapper">
            {!showVideo ? (
              <img
                src={theme === 'light' ? meWhite : meDark}
                alt="Terapeuta"
                className="about-image"
                style={{ transition: 'opacity 0.3s ease' }}
              />
            ) : (
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/ttWUi56Duog?si=4jVX6tU6GnYpyZN3"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="about-video"
              ></iframe>
            )}
          </div>

          <button className="nav-btn prev-btn" onClick={toggleMedia} aria-label="Previous slide">
            <ChevronLeft size={24} color="#fff" />
          </button>
          <button className="nav-btn next-btn" onClick={toggleMedia} aria-label="Next slide">
            <ChevronRight size={24} color="#fff" />
          </button>
        </div>

        <div className="about-text">
          <h2 className="section-title" style={{ textAlign: 'left' }}>Sobre Mí</h2>
          <p>
            Soy María Lorena Calcopietro, Licenciada en Comunicación y fundadora de <a href="https://www.instagram.com/activatupazinterior?igsh=dzJhd3l1YnR4czJv&utm_source=qr" target="_blank" rel="noopener noreferrer" className="brand-link">Activa tu Paz Interior</a>, un espacio dedicado a la sanación emocional para lograr el bienestar.
            Mi misión es acompañarte en un camino de autoconocimiento para que puedas identificar emociones, bloqueos y patrones que influyen en tu armonía.
          </p>
          <p>
            A través de métodos como la biodescodificación emocional, constelaciones familiares y los Registros Akáshicos, te invito a explorar tu mundo interior y abrir espacio a la transformación.
            Creo en el poder de sanar cuando escuchamos nuestro cuerpo y nuestras emociones.
          </p>
          <p>
            En <a href="https://www.instagram.com/activatupazinterior?igsh=dzJhd3l1YnR4czJv&utm_source=qr" target="_blank" rel="noopener noreferrer" className="brand-link">Activa tu Paz Interior</a> encontrarás un sitio seguro para reconectar con tu esencia y transformar tu historia desde la raíz.
          </p>
        </div>
      </div>

      <style jsx="true">{`
        .about {
          background-color: var(--bg-main);
          position: relative;
          margin-top: -90px;
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .about-media-container {
          position: relative;
          width: 100%;
          height: 400px; /* Fixed height matching previous image */
          border-radius: var(--radius-card);
          box-shadow: var(--shadow-soft);
          overflow: hidden;
        }

        .media-wrapper {
          width: 100%;
          height: 100%;
        }

        .about-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        
        .about-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0,0,0,0.5);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: background-color 0.3s;
          z-index: 10;
        }
        
        .nav-btn:hover {
          background-color: var(--primary);
        }

        .prev-btn {
          left: 10px;
        }

        .next-btn {
          right: 10px;
        }

        .about-text p {
          margin-bottom: 20px;
          color: var(--text-main);
          font-size: 1.1rem;
        }

        .brand-link {
          font-weight: bold;
          color: var(--primary);
          text-decoration: none;
          transition: opacity 0.3s;
        }
        
        .brand-link:hover {
          text-decoration: underline;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .about-content {
            grid-template-columns: 1fr;
          }
          
          .about-media-container {
            order: -1;
            margin-bottom: 20px;
            height: 300px; /* Smaller height on mobile if needed, or keep 400 */
          }
          
          .about-text h2 {
            text-align: center !important;
          }

          .nav-btn {
            opacity: 1 !important; /* Force visibility */
            visibility: visible !important;
            display: flex !important;
            z-index: 20 !important;
            background-color: rgba(0,0,0,0.6); /* Slightly darker for better contrast */
            width: 45px; /* Slightly larger targets */
            height: 45px;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
