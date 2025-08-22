import { useState, useEffect } from 'react';
import './FeaturesCarousel.css';

const FeaturesCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      id: 1,
      title: "Control de Gastos",
      subtitle: "Historial de Gastos",
      description: "Mantén un registro detallado de todos tus gastos con categorización automática y reportes visuales para un mejor control financiero.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: "📊"
    },
    {
      id: 2,
      title: "Gestión de Presupuesto",
      subtitle: "Creación y Control",
      description: "Crea presupuestos personalizados por categoría y recibe alertas inteligentes cuando te acerques a tus límites establecidos.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: "💰"
    },
    {
      id: 3,
      title: "Gestión de Deudas",
      subtitle: "Control Total",
      description: "Organiza y rastrea todas tus deudas con recordatorios de pagos, cálculo de intereses y estrategias de pago personalizadas.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: "📋"
    },
    {
      id: 4,
      title: "Personalización de Tarjetas",
      subtitle: "Diseño Único",
      description: "Personaliza tus tarjetas con colores, imágenes y diseños únicos que reflejen tu estilo personal y profesional.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: "🎨"
    },
    {
      id: 5,
      title: "Congelar Tarjeta",
      subtitle: "Seguridad Instantánea",
      description: "Congela tu tarjeta instantáneamente desde la app en caso de pérdida o uso no autorizado, manteniendo tu dinero seguro.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: "🔒"
    }
  ];

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + features.length) % features.length);
  };

  const goToNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % features.length);
  };

  return (
    <section className="features-carousel">
      <div className="carousel-container">
        <div className="carousel-header">
          <h2>Funcionalidades Principales</h2>
          <p>Descubre todo lo que TrackIt puede hacer por tu negocio</p>
        </div>
        
        <div className="carousel-wrapper">
          <button className="carousel-button prev" onClick={goToPrevious}>
            <span>‹</span>
          </button>
          
          <div className="carousel-slides">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                style={{
                  transform: `translateX(${(index - currentSlide) * 100}%) rotateY(${(index - currentSlide) * 15}deg)`
                }}
              >
                <div className="slide-content">
                  <div className="slide-image">
                    <img src={feature.image} alt={feature.title} />
                    <div className="feature-icon">{feature.icon}</div>
                  </div>
                  <div className="slide-text">
                    <h3>{feature.title}</h3>
                    <h4>{feature.subtitle}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="carousel-button next" onClick={goToNext}>
            <span>›</span>
          </button>
        </div>
        
        <div className="carousel-indicators">
          {features.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesCarousel;
