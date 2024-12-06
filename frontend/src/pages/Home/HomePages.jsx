import React from 'react';
import { useNavigate } from "react-router-dom";
import OceanBodySlider from '../../components/OceanBodySlider/OceanBodySlider';
import './HomePages.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className='font2'>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to PloufPlouf</h1>
      </header>
      <main style={styles.main}>
        <div className='container-jaj'>
          <OceanBodySlider />
          <button
            className='login-button'
            onClick={() => navigate('/login')}
            type='button'>
            Logout
          </button>
        </div>
      </main>
      <footer style={styles.footer}>
        <p>© 2024 SM3 Company</p>
      </footer>
    </div>
  );
};

const styles = {
  header: {
    background: '#282c34',
    padding: '20px',
    color: 'white',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
  },
  main: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    background: '#282c34',
    padding: '10px',
    color: 'white',
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
};

export default HomePage;

