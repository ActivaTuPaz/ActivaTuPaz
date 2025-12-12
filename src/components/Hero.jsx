import { useState, useEffect } from 'react';
import cover0 from '../assets/images/cover0.png';
import coverImage from '../assets/images/cover.webp';
import coverImage2 from '../assets/images/cover2.webp';
import coverImage3 from '../assets/images/cover3.webp';
import coverImage4 from '../assets/images/cover4.webp';

const Hero = () => {
  // Main static image (Top)
  const staticImage = cover0;

  // Carousel images (Bottom)
  // Carousel images (Bottom)
  const carouselImages = [coverImage, coverImage4, coverImage2, coverImage3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, [currentIndex, carouselImages.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div id="home" className="hero-container">

      {/* Top Section: Static Image */}
      <div className="hero-static" style={{ backgroundImage: `url(${staticImage})` }}>
        <div className="hero-content">
          <a href="#services" className="hero-btn">Ver servicios</a>
        </div>
      </div>

      {/* Bottom Section: Mini Carousel */}
      <div className="hero-mini-carousel">
        {carouselImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`carousel-bg ${index === currentIndex ? 'active' : ''}`}
          />
        ))}

        <div className="carousel-dots">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative Separator */}
      <div className="hero-separator">
        <svg width="100%" height="100%" viewBox="0 0 120 20" preserveAspectRatio="none" className="flourish-svg">
          <path
            d="M0,10 C30,10 30,5 60,5 C90,5 90,10 120,10"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="60" cy="5" r="2" fill="var(--primary)" />
        </svg>
      </div>

      <style jsx="true">{`
        .hero-container {
          width: 100%;
          min-height: 85vh;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-main);
          margin-top: 0;
          padding-bottom: 60px; /* Increased visual space below */
        }

        /* Top Static Section */
        .hero-static {
          width: 100%;
          height: 85vh; /* Restored to original height */
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
        }

        .hero-content {
          position: absolute;
          bottom: 20%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          text-align: center;
          width: auto;
        }

        /* Bottom Carousel Section */
        .hero-mini-carousel {
          width: 90%; /* Card style: limited width */
          max-width: 1000px; /* Max width */
          height: 350px; /* Fixed card height */
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--bg-card); /* Card background */
          margin: 0 auto; /* Horizontally centered */
          border-radius: 20px; /* Rounded corners */
          box-shadow: 0 10px 30px rgba(0,0,0,0.2); /* Shadow for lift */
          transform: translateY(-20%); /* Less overlap, just touching */
          z-index: 20;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .carousel-bg {
           position: absolute;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           display: block;
           object-fit: cover;
           opacity: 0;
           transition: opacity 1.5s ease-in-out;
           z-index: 1;
        }

        .carousel-bg.active {
          opacity: 1;
          z-index: 2;
        }

        .hero-btn {
          padding: 12px 30px;
          font-size: 1.5rem; /* Larger again like original */
          background-color: var(--primary);
          color: var(--text-on-primary);
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
          font-family: 'Cinzel', serif;
          text-transform: uppercase;
          letter-spacing: 2px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          border-radius: 4px;
        }

        .hero-btn:hover {
          background-color: var(--secondary);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        .carousel-dots {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 20;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .dot.active {
          background-color: var(--primary);
          transform: scale(1.2);
          border-color: var(--bg-main);
        }

        .hero-separator {
          width: 100%;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: -30px; 
          opacity: 0.8;
          max-width: 300px;
          margin-left: auto;
          margin-right: auto;
          z-index: 5;
          position: relative;
        }

        @media (max-width: 768px) {
          .hero-static {
            height: 60vh;
          }
           .hero-content {
            bottom: 25%; /* Adjust for mobile */
          }
          .hero-btn {
            font-size: 1rem; /* Smaller font for mobile */
            padding: 10px 24px; /* Reduced padding */
          }
          .hero-mini-carousel {
            width: 95%;
            height: 250px;
            transform: translateY(-15%); /* Subtle overlap on mobile */
          }
          
          .carousel-bg {
            transform: scale(1.6); /* Zoom center to make text legible */
          }

          .hero-separator {
            margin-top: -10px; /* Reverted for mobile */
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
