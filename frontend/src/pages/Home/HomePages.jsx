import React from 'react';

const HomePage = () => {
  return (
    <div>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to PloufPlouf</h1>
      </header>
      <main style={styles.main}>
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

