import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './FloatingElement.css';

const FloatingElement = ({ child }) => {
  const [inputValue, setInputValue] = useState('');

  // Fonction pour calculer la descente en fonction de la longueur du texte
  const calculateDrop = (inputLength) => inputLength * 30;

  // Animation de flottement pour les champs vides
  const floatingAnimation = {
    y: [0, -10, 0], // Mouvement de va-et-vient vertical
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  return (
    <motion.div
      className="floating-element"
      initial={{ y: 0 }}
      animate={inputValue.length > 0 
        ? { y: calculateDrop(inputValue.length) }  // Gravité appliquée
        : floatingAnimation  // Flottement
      }
      transition={inputValue.length > 0 
        ? { type: "spring", stiffness: 70, damping: 15 } 
        : floatingAnimation.transition
      }
    >
      {child}
    </motion.div>
  );
};

export default FloatingElement;
