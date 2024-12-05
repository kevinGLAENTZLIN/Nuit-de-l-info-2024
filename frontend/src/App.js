import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

const App = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const calculateDrop = (inputLength) => inputLength * 30;

  const floatingAnimation = {
    x: [0, 10, 0],
    y: [0, -10, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  return (
    <div className="container">
      <motion.div
        className="field"
        initial={{ y: 0 }}
        animate={usernameInput.length > 0
          ? { y: calculateDrop(usernameInput.length) }
          : floatingAnimation
        }
        transition={usernameInput.length > 0
          ? { type: "spring", stiffness: 70, damping: 15 }
          : floatingAnimation.transition
        }
      >
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
      </motion.div>

      <motion.div
        className="field"
        initial={{ y: 0 }}
        animate={passwordInput.length > 0
          ? { y: calculateDrop(passwordInput.length) }
          : floatingAnimation
        }
        transition={passwordInput.length > 0
          ? { type: "spring", stiffness: 70, damping: 15 }
          : floatingAnimation.transition
        }
      >
        <input
          type="password"
          placeholder="Mot de passe"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
      </motion.div>

      <motion.button
        className="button"
        initial={{ y: 0 }}
        animate={(usernameInput.length > 0 || passwordInput.length > 0)
          ? { y: (calculateDrop(usernameInput.length + passwordInput.length) / 2) }
          : floatingAnimation
        }
        transition={(usernameInput.length > 0 || passwordInput.length > 0)
          ? { type: "spring", stiffness: 70, damping: 15 }
          : floatingAnimation.transition
        }
      >
        Connexion
      </motion.button>
    </div>
  );
};

export default App;
