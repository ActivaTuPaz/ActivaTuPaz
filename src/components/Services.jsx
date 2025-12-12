import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Link } from 'react-router-dom';
import { workshops } from '../data/workshops';
import { ChevronLeft, ChevronRight, ChevronsLeftRight, ChevronDown, ChevronUp } from 'lucide-react';

const CarouselSection = ({ items }) => {
  // Generate a random ID for this specific carousel instance to ensure unique navigation buttons
  const carouselId = useRef(`carousel-${Math.random().toString(36).substr(2, 9)}`).current;
  const swiperRef = useRef(null);

  // Duplicate items if there are too few (<= 3) to ensure infinite loop works smoothly on desktop
  // Swiper sometimes struggles when slidesPerView >= slides.length in loop mode
  const displayItems = items.length > 0 && items.length <= 3
    ? [...items, ...items]
    : items;

  return (
    <div className="carousel-wrapper">
      <p className="swipe-hint">
        <ChevronsLeftRight size={16} /> Desliza para ver más
      </p>

      <div className="carousel-container">
        {/* Navigation buttons with unique classes */}
        <button className={`nav-btn prev-btn prev-${carouselId}`}>
          <ChevronLeft size={30} />
        </button>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={false}
          watchOverflow={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          // Explicitly connect to the unique buttons
          navigation={{
            prevEl: `.prev-${carouselId}`,
            nextEl: `.next-${carouselId}`,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="services-swiper"
        >
          {items.map((service) => (
            <SwiperSlide key={service.id} style={{ height: 'auto' }}>
              <div className="service-card">
                <div className="card-image">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="card-content">
                  <h3>{service.title}</h3>
                  <p>{service.shortDescription}</p>
                  <Link to={`/taller/${service.id}`} className="card-btn">
                    Más información
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className={`nav-btn next-btn next-${carouselId}`}>
          <ChevronRight size={30} />
        </button>
      </div>
    </div>
  );
};

const Services = () => {
  const [openSection, setOpenSection] = useState(null); // 'talleres', 'sesiones', or both/null

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const workshopIds = [
    'dar-voz-a-tu-verdad',
    'lealtades-familiares',
    'universo-emociones'
  ];

  const talleres = workshops.filter(w => workshopIds.includes(w.id));
  const sesiones = workshops.filter(w => !workshopIds.includes(w.id));

  return (
    <section id="services" className="section services">
      <div className="container">
        <h2 className="section-title main-title">Talleres y Sesiones</h2>

        {/* Sección Sesiones */}
        <div className="accordion-item">
          <button
            className={`accordion-header ${openSection === 'sesiones' ? 'active' : ''}`}
            onClick={() => toggleSection('sesiones')}
          >
            <h3>Sesiones</h3>
            {openSection === 'sesiones' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>

          <div className={`accordion-content ${openSection === 'sesiones' ? 'open' : ''}`}>
            <CarouselSection items={sesiones} />
          </div>
        </div>

        {/* Sección Talleres */}
        <div className="accordion-item">
          <button
            className={`accordion-header ${openSection === 'talleres' ? 'active' : ''}`}
            onClick={() => toggleSection('talleres')}
          >
            <h3>Talleres</h3>
            {openSection === 'talleres' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>

          <div className={`accordion-content ${openSection === 'talleres' ? 'open' : ''}`}>
            <CarouselSection items={talleres} />
          </div>
        </div>

      </div>

      <style jsx="true">{`
        .services {
          background-color: var(--bg-card);
          position: relative;
          padding-bottom: 80px;
        }

        .main-title {
          margin-bottom: 40px;
        }

        .accordion-item {
          margin-bottom: 20px;
          border-radius: var(--radius-card);
          overflow: hidden;
          background-color: var(--bg-main);
          box-shadow: var(--shadow-soft);
          border: 1px solid var(--border);
        }

        .accordion-header {
          width: 100%;
          padding: 20px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .accordion-header:hover {
          background-color: rgba(var(--primary-rgb), 0.05); /* Soft highlight */
        }

        .accordion-header h3 {
          margin: 0;
          font-family: 'Cinzel', serif;
          font-size: 1.5rem;
          color: var(--primary);
        }

        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out;
          opacity: 0;
        }

        .accordion-content.open {
          max-height: 1000px; /* Arbitrary large height */
          opacity: 1;
          padding-bottom: 30px;
        }

        .carousel-wrapper {
          padding-top: 20px;
        }

        .carousel-container {
          position: relative;
          padding: 0 40px;
          display: flex;
          align-items: center;
        }

        .swipe-hint {
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 15px;
          display: none; /* Hidden by default (Desktop) */
          align-items: center;
          justify-content: center;
          gap: 8px;
          opacity: 0.8;
          animation: pulse 2s infinite;
        }

        .services-swiper {
          width: 100%;
          padding-bottom: 50px !important;
        }

        .service-card {
          background: var(--bg-main);
          border-radius: var(--radius-card);
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(var(--shadow-color),0.05);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .service-card:hover {
          box-shadow: var(--shadow-soft);
          border-color: var(--primary);
        }

        .card-image img {
          width: 100%;
          height: 240px;
          object-fit: cover;
        }

        .card-content {
          padding: 30px;
          text-align: left;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .card-content h3 {
          color: var(--primary);
          margin-bottom: 15px;
          font-size: 1.6rem;
          min-height: 4.8rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-content p {
          color: var(--text-main);
          margin-bottom: 25px;
          font-size: 1rem;
          line-height: 1.7;
        }

        .card-btn {
          background: transparent;
          border: 1px solid var(--primary);
          color: var(--primary);
          padding: 10px 24px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          margin-top: auto;
          align-self: flex-start;
        }

        .card-btn:hover {
          background: var(--primary);
          color: var(--text-on-primary);
        }
        
        .nav-btn {
          background: transparent;
          border: none;
          color: var(--primary);
          cursor: pointer;
          padding: 10px;
          transition: transform 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
        }

        .prev-btn {
          left: 0;
        }

        .next-btn {
          right: 0;
        }
        
        .nav-btn:hover {
          transform: translateY(-50%) scale(1.2);
          color: var(--text-main);
        }
        
        .nav-btn.swiper-button-disabled {
          opacity: 0.3;
          pointer-events: none;
        }

        .nav-btn.swiper-button-lock {
          display: none;
        }

        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }

        @media (max-width: 768px) {
          .carousel-container {
            padding: 0;
          }
          .nav-btn {
            display: none;
          }
          .swipe-hint {
            display: flex; /* Visible only on mobile */
          }
          .accordion-header {
            padding: 15px 20px;
          }
        }
        
        /* Swiper Customization */
        :global(.swiper-pagination-bullet) {
          background: var(--text-secondary);
        }
        :global(.swiper-pagination-bullet-active) {
          background: var(--primary);
        }
      `}</style>
    </section>
  );
};

export default Services;
