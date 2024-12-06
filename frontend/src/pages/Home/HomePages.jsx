import React from 'react';
import { useNavigate } from "react-router-dom";
import OceanBodySlider from '../../components/OceanBodySlider/OceanBodySlider';
import './HomePages.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className='259d9a8737a84c7c91d40091baa0e360'>
      <header style={aeab59423f04ac0b90fe983056a788c.header}>
        <h1 style={aeab59423f04ac0b90fe983056a788c.title}>Welcome to PloufPlouf</h1>
      </header>
      <main style={aeab59423f04ac0b90fe983056a788c.main}>
        <div className='cc5f7e978b2d4ad7870a4cfcc7132af0'>
          <OceanBodySlider />
          <button
            className='2df7369b29a04495a2b0c1ae4eb83496'
            onClick={() => navigate('/login')}
            type='button'>
            Logout
          </button>
        </div>
      </main>
      <footer style={aeab59423f04ac0b90fe983056a788c.footer}>
        <p>© 2024 SM3 Company</p>
      </footer>
    </div>
  );
};

const aeab59423f04ac0b90fe983056a788c = {
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
