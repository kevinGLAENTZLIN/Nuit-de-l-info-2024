import React from 'react';
import FloatingElement from '../../components/FloatingElement/FloatingElement';
import MDPInput from '../../components/MDPInput/MDPInput';
import './Login.css';

const Login = () => {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div className="login-container">
      {/*<FloatingElement child={
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      }/>*/}
      <FloatingElement child={
        <MDPInput placeholder="Mot de passe" />
      }/>
      <button className="login-button">Connexion</button>
    </div>
  );
};

export default Login;
