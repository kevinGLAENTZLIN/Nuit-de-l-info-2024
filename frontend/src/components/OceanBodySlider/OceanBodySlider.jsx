import React, { useState } from 'react';
import './OceanBodySlider.css';

const OceanBodySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const parallels = [
    {
      title: "Cœur (Circulation sanguine)",
      description: "Le cœur pompe le sang à travers les artères et les veines, tout comme les courants marins transportent des nutriments et des éléments essentiels dans l'océan.",
      animationClass: 'heart',
    },
    {
      title: "Poumons (Photosynthèse)",
      description: "Les poumons humains absorbent l'oxygène et expulsent le CO2, tout comme les planctons et les algues marines dans l'océan absorbent le CO2 et produisent de l'oxygène pendant la photosynthèse.",
      animationClass: 'lungs',
    },
    {
      title: "Courants marins (Transport des nutriments)",
      description: "Les courants marins déplacent les nutriments essentiels à travers les océans, tout comme les artères transportent le sang riche en nutriments à travers le corps humain.",
      animationClass: 'current',
    },
    {
      title: "Système digestif (Nutriments marins)",
      description: "Tout comme le système digestif transforme la nourriture en nutriments pour nourrir les cellules du corps, les océans distribuent des nutriments à travers les courants marins pour soutenir la vie marine.",
      animationClass: 'nutrients',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % parallels.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + parallels.length) % parallels.length);
  };

  return (
    <div className="slider-container">
      <div className="slide">
        <div className={`animated-element ${parallels[currentSlide].animationClass}`} />
        <h2>{parallels[currentSlide].title}</h2>
        <p>{parallels[currentSlide].description}</p>
      </div>

      <div className="controls">
        <button type="button" onClick={prevSlide} className="control-btn">Précédent</button>
        <button type="button" onClick={nextSlide} className="control-btn">Suivant</button>
      </div>
    </div>
  );
};

export default OceanBodySlider;
