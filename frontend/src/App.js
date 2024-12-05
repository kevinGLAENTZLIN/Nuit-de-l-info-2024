import React from 'react';
import LoginPage from './components/LoginPage/LoginPage'; // Importation de la page de connexion
import './App.css'; // Optionnel, pour du style global

function App() {
  return (
    <div className="App">
      {/* Affichage de la page de connexion */}
      <LoginPage />
    </div>
  );
}

export default App;
