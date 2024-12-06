import React, { useState } from 'react';
import './OceanBodySlider.css';
import '../../components/WaveBackground/Wave';
import WaveContainer from '../../components/WaveBackground/Wave';

const OceanBodySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const ocean = [
    {
      title: "Courants marins",
      description: "Les courants marins déplacent les nutriments essentiels à la survie de tous l'écosystème à travers les océans.",
      animationClass: 'heart',
    },
    {
      title: "Plancton",
      description: "Le plancton est un élément essentiel dans la décomposition des déchets dans l'océan.",
      animationClass: 'nutrients',
    },
    {
      title: "Phytoplancton & Algues",
      description: "Les phytoplanctons et les algues permettent de produire de l'oxygène et absorbe le CO2 de l'atmosphère. C'est l'un des poumons de la planète.",
      animationClass: 'lungs',
    },
  ];

  const humanBody = [
    {
      title: "Veines et artères",
      description: "Les veines et les artères permettent de transporter un sang riche en nutriment dans tout les organes du corps.",
    },
    {
      title: "Système digestif",
      description: "Le système digestif permet de décomposer les aliments pour en extraire les nutriments essentiels à la survie du corps.",
    },
    {
      title: "Poumons",
      description: "Les poumons permettent de capter l'oxygène de l'air et de rejeter le CO2 produit par le corps.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % ocean.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + ocean.length) % ocean.length);
  };

  return (
    <div className="slider-container font2">
      <div className="wave-container">
        <WaveContainer waveCount={10} />
      </div>
      <div className="main-container-slider">
        <div className="content">
          <div className="slide">
            <div className={`animated-element ${ocean[currentSlide].animationClass}`} />
          </div>
          <div className="comparatif">
            <div>
              <h1>{ocean[currentSlide].title}</h1>
              <p
                style={{
                  color: '#000000',
                  fontSize: '1.5rem',
              }}
              >{ocean[currentSlide].description}</p>
            </div>
            <div>
              <h1>{humanBody[currentSlide].title}</h1>
              <p
                style={{
                  color: '#000000',
                  fontSize: '1.5rem',
              }}
              >{humanBody[currentSlide].description}</p>
            </div>
          </div>
          <div className="controls">
            <button onClick={prevSlide} className="control-btn">Précédent</button>
            <button onClick={nextSlide} className="control-btn">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OceanBodySlider;
