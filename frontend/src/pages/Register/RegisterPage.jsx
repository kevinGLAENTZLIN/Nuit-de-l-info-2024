import React, { useState } from 'react';
import FloatingElement from '../../components/FloatingElement/FloatingElement';
import MDPInput from '../../components/MDPInput/MDPInput';
import ReverseInput from '../../components/ReverseInput/ReverseInput';
import './Register.css';
import MapInput from '../../components/MapInput/MapInput';
import DateOfBirthGuess from '../../components/DateOfBirthGuess/DateOfBirthGuess';
const API_URL = process.env.REACT_APP_API_URL;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAdress] = useState("Votre addresse: ");
  const [dateOfBirth, setDateOfBirth] = useState("Date de naissance");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/api/user/r`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        email
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        console.log('token:', data.token);
      }
    })
    .catch(error => {
      console.error('Erreur:', error);
      alert('Une erreur est survenue.');
    });
  };


  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <FloatingElement inputValue={username}>
            <ReverseInput placeholder="Username | earsUenm" inputValue={username} setInputValue={setUsername} />
        </FloatingElement>
        <FloatingElement inputValue={email}>
            <ReverseInput placeholder="Email" inputValue={email} setInputValue={setEmail} />
        </FloatingElement>
        <FloatingElement inputValue={password}>
            <MDPInput placeholder="Mot de passe" inputValue={password} setInputValue={setPassword}/>
        </FloatingElement>
        <FloatingElement multiplicator={5} inputValue={address}>
            <MapInput placeholder="Votre addresse: " inputValue={address} setInputValue={setAdress}/>
        </FloatingElement>
        <FloatingElement inputValue={dateOfBirth}>
            <DateOfBirthGuess placeholder="Date de naissance" inputValue={dateOfBirth} setInputValue={setDateOfBirth}/>
        </FloatingElement>
        <button type='submit' className="register-button">Connexion</button>
      </form>
    </div>
  );
};

export default Register;
