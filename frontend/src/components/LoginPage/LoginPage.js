import React from 'react';
import FloatingElement from '../FloatingElement/FloatingElement';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <FloatingElement placeholder="Nom d'utilisateur" />
      <FloatingElement placeholder="Mot de passe" type="password" />
      <button className="login-button">Connexion</button>
    </div>
  );
};

export default LoginPage;
