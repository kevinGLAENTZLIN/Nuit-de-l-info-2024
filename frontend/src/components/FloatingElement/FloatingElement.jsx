import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './FloatingElement.css';

const FloatingElement = ({ children, multiplicator = 30, inputValue }) => {
  const [horizontalMovement, setHorizontalMovement] = useState(0);

  const calculateDrop = (inputLength) => inputLength * multiplicator;

  const generateRandomHorizontalMovement = () => {
    return Math.random() * window.innerWidth - (window.innerWidth / 2);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHorizontalMovement(generateRandomHorizontalMovement());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="floating-element"
      initial={{ y: 0, x: horizontalMovement }}
      animate={{
        y: inputValue.length > 0 ? calculateDrop(inputValue.length) : 0,
        x: horizontalMovement,
        transition: {
          type: 'spring',
          stiffness: 70,
          damping: 25,
        },
      }}
    >
      { children }
      </motion.div>
  );
};

export default FloatingElement;
