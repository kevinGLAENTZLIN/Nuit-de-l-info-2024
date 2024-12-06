import React, { useState } from 'react';
import FloatingElement from '../../components/FloatingElement/FloatingElement';
import MDPInput from '../../components/MDPInput/MDPInput';
import EMailInput from "../../components/EMailInput/EMailInput";
import './Login.css';

const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.o1p2q3r4) {
        console.log('token:', data.o1p2q3r4);
      } else
        alert('Erreur :)');
    })
    .catch(error => {
      console.error('Erreur:', error);
      alert('Une erreur est survenue.');
    });
  };


  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <FloatingElement inputValue={email}>
            <EMailInput placeholder="Email" inputValue={email} setInputValue={setEmail} />
        </FloatingElement>
        <FloatingElement inputValue={password}>
            <MDPInput placeholder="Mot de passe" inputValue={password} setInputValue={setPassword}/>
        </FloatingElement>
        <button type='submit' className="login-button">Connexion</button>
      </form>
    </div>
  );
};

export default Login;
