import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { workshops } from '../data/workshops';
import { useEffect } from 'react';

const WorkshopDetail = () => {
  const { id } = useParams();
  const workshop = workshops.find(w => w.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!workshop) {
    return (
      <div className="not-found">
        <h2>Taller no encontrado</h2>
        <Link to="/" className="back-btn">Volver al inicio</Link>
      </div>
    );
  }

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <motion.div
      className="workshop-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} /> Volver
        </Link>

        <div className="content-wrapper">
          <header className="workshop-header">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {workshop.title}
            </motion.h1>
          </header>

          <div className="workshop-body">
            <div className="description-section">
              {workshop.fullDescription && workshop.fullDescription.map((paragraph, idx) => (
                <div key={idx}>
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + (idx * 0.1) }}
                  >
                    {paragraph}
                  </motion.p>

                  {/* Insert image after first paragraph */}
                  {idx === 0 && workshop.image && (
                    <motion.div
                      className="detail-image-container"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <img src={workshop.image} alt={workshop.title} className="detail-image" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            <motion.div
              className="ideal-for-section"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h3>💬 ¿Es para vos?</h3>
              <p>{workshop.idealFor}</p>
            </motion.div>

            <div className="action-area">
              <motion.a
                href={`https://wa.me/5492216492754?text=${encodeURIComponent(`Hola, quisiera reservar mi lugar para el taller: ${workshop.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
                onMouseEnter={handleConfetti}
                onViewportEnter={() => {
                  // Simple check to avoid firing excessively or on desktop if not desired, 
                  // but viewport enter is a great heuristic for "just scroll down to see it"
                  // We can limit this to happen once using state if needed, but framer motion handles enter well.
                  // To make it distinct for mobile, we can check width or just let it happen on scroll for everyone as a surprise.
                  // Given the user request "Aplicalo para moviles", checking window width is safer to avoid double effect on desktop.
                  if (window.innerWidth < 768) {
                    handleConfetti();
                  }
                }}
                viewport={{ once: true, amount: 0.5 }} // Trigger when 50% of button is visible, only once
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Escribime y reservá tu lugar <MessageCircle size={20} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .workshop-detail {
          padding-top: 100px;
          padding-bottom: 80px;
          min-height: 100vh;
          background-color: var(--bg-main);
        }

        .container {
          max-width: 800px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--primary);
          text-decoration: none;
          font-weight: 500;
          margin-bottom: 40px;
          transition: transform 0.3s ease;
        }

        .back-link:hover {
          transform: translateX(-5px);
        }

        .content-wrapper {
          background-color: var(--bg-card);
          padding: 40px;
          border-radius: var(--radius-card);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-soft);
        }

        .workshop-header h1 {
          font-family: 'Cinzel', serif;
          font-size: 2.5rem;
          color: var(--primary);
          margin-bottom: 30px;
          text-align: center;
          border-bottom: 2px solid var(--primary);
          padding-bottom: 20px;
        }

        .description-section p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-main);
          margin-bottom: 20px;
          text-align: justify;
        }

        .detail-image-container {
          margin: 30px auto;
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-soft);
        }

        .detail-image {
          width: 100%;
          height: 350px; /* Fixed height for crop effect */
          object-fit: cover; /* Crop to fit */
          object-position: center;
          display: block;
        }

        .ideal-for-section {
          background-color: var(--bg-alt);
          padding: 25px;
          border-radius: 12px;
          margin: 40px 0;
          border-left: 4px solid var(--primary);
        }

        .ideal-for-section h3 {
          color: var(--primary);
          margin-bottom: 10px;
          font-size: 1.3rem;
        }

        .ideal-for-section p {
          color: var(--text-main);
          font-style: italic;
          margin: 0;
        }

        .action-area {
          display: flex;
          justify-content: center;
          margin-top: 40px;
        }

        .cta-button {
          background-color: var(--primary);
          color: var(--text-on-primary);
          padding: 16px 32px;
          border-radius: 50px;
          font-size: 1.2rem;
          font-weight: bold;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 4px 15px rgba(var(--shadow-color), 0.3);
          cursor: pointer;
          border: none;
        }

        .not-found {
           text-align: center;
           padding: 100px 0;
           color: var(--text-main);
        }

        @media (max-width: 768px) {
          .workshop-header h1 {
            font-size: 1.8rem;
          }
          
          .content-wrapper {
            padding: 20px;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default WorkshopDetail;
