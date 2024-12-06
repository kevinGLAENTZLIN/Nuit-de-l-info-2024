import React from 'react';
import FloatingElement from '../../components/FloatingElement/FloatingElement';
import MDPInput from '../../components/MDPInput/MDPInput';
import ReverseInput from '../../components/ReverseInput/ReverseInput';
import './Login.css';
import MapInput from '../../components/MapInput/MapInput';

const Login = () => {
  return (
    <div className="login-container">
      <FloatingElement>
          <ReverseInput placeholder="Username | earsUenm" />
      </FloatingElement>

      <FloatingElement>
          <MDPInput placeholder="Mot de passe" />
      </FloatingElement>
      <FloatingElement multiplicator={5}>
          <MapInput placeholder="Address: " />
      </FloatingElement>
      <button className="login-button">Connexion</button>
    </div>
  );
};

export default Login;
