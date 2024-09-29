import React, { useState } from 'react';

const BailPrediction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handlePredict = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPrediction(78);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Bail Acceptance Predictor</h1>
      <p style={styles.paragraph}>
        Get an instant prediction of your bail acceptance rate based on current data. Click the button below to predict the chances of bail acceptance.
      </p>
      
      <button style={styles.button} onClick={handlePredict} disabled={isLoading}>
        {isLoading ? 'Predicting...' : 'Predict the Acceptance'}
      </button>

      {prediction !== null && (
        <div style={styles.prediction}>
          <h2>Your Predicted Acceptance Rate: {prediction}%</h2>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: '20px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '1.2rem',
    textAlign: 'center',
    maxWidth: '600px',
    marginBottom: '30px',
  },
  button: {
    backgroundColor: '#000000',
    color: '#ffffff',
    border: 'none',
    padding: '15px 30px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s ease',
  },
  buttonHover: {
    transform: 'scale(1.05)',
  },
  prediction: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#f7f7f7',
    border: '2px solid #000000',
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    fontSize: '1.8rem',
  },
};

export default BailPrediction;
