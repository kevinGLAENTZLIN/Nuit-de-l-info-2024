import React from 'react';
import HomePage from './pages/Home/HomePages.jsx'
import LoginPage from './pages/Login/Login.jsx'
import CaptchaPage from './pages/CaptchaPage/CaptchaPage.jsx'
import RegisterPage from './pages/Register/RegisterPage.jsx'
import PasswordLostPage from './pages/PasswordLost/PasswrodLost.jsx'
import './App.css'; // Optionnel, pour du style global
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/findpassword" element={<PasswordLostPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/captcha" element={<CaptchaPage />} />
      </Routes>
    </Router>
  );
}

export default App;
