import React, { useState } from 'react';
import './OceanBodySlider.css';
import '../../components/WaveBackground/Wave';
import WaveContainer from '../../components/WaveBackground/Wave';

const OceanBodySlider = () => {
  const [d3f7c9e5, d9a6f3c7] = useState(0);

  const c7e9b5a2 = [
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

  const a5b9c7d2 = [
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

  const b8f7a9e5 = () => {
    d9a6f3c7((c5d7a9f2) => (c5d7a9f2 + 1) % c7e9b5a2.length);
  };

  const f6c9d3a8 = () => {
    d9a6f3c7((a6d3b9f5) => (a6d3b9f5 - 1 + c7e9b5a2.length) % c7e9b5a2.length);
  };

  return (
    <div className="slider-container font2">
      <div className="wave-container">
        <WaveContainer waveCount={10} />
      </div>
      <div className="main-container-slider">
        <div className="content">
          <div className="slide">
            <div className={`animated-element ${c7e9b5a2[d3f7c9e5].animationClass}`} />
          </div>
          <div className="comparatif">
            <div>
              <h1>{c7e9b5a2[d3f7c9e5].title}</h1>
              <p
                style={{
                  color: '#000000',
                  fontSize: '1.5rem',
              }}
              >{c7e9b5a2[d3f7c9e5].description}</p>
            </div>
            <div>
              <h1>{a5b9c7d2[d3f7c9e5].title}</h1>
              <p
                style={{
                  color: '#000000',
                  fontSize: '1.5rem',
              }}
              >{a5b9c7d2[d3f7c9e5].description}</p>
            </div>
          </div>
          <div className="controls">
            <button onClick={f6c9d3a8} className="control-btn">Précédent</button>
            <button onClick={b8f7a9e5} className="control-btn">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OceanBodySlider;
