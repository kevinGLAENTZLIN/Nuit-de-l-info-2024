import React, { useState } from 'react';
import DrawingCanvas from '../../components/DrawingCanvas/DrawingCanvas.jsx';
import Tesseract from "tesseract.js";

const API_URL = process.env.REACT_APP_API_URL;

const PasswordResetPage = () =>{
  
  const [email, setEmail] = useState("");
  const [isEmailValidated, setIsEmailValidated] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [wordToGuess, setWordToGuess] = useState("REACT");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const maxIncorrectGuesses = 10;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async () => {
    fetch(`${API_URL}/api/user/u/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.password) {
          setIsEmailValidated(true);
          setWordToGuess(data.password);
        } else
          alert('Erreur :)');
      })
      .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue.');
      });
  };

  const handleImageSave = (image) => {
    Tesseract.recognize(
      image,
      'eng',
      {
        logger: (info) => console.log(info),
      }
    ).then(({ data: { text } }) => {
      const character = text.trim();
      setRecognizedText(character);
    }).catch((error) => {
      console.error("Error recognizing text:", error);
    });
  };

  const handleValidate = () => {
    const character = recognizedText.trim();
    if (character.length === 1 && character.charCodeAt(0) < 128) {
      if (!guessedLetters.includes(character)) {
        setGuessedLetters([...guessedLetters, character]);
        if (!wordToGuess.includes(character)) {
          setIncorrectGuesses(incorrectGuesses + 1);
        }
      }
    }
    setRecognizedText("");
  };

  const displayWord = () => {
    return wordToGuess.split('').map((letter) => (
      guessedLetters.includes(letter) ? letter : "_"
    )).join(' ');
  };

  const isGameOver = incorrectGuesses >= maxIncorrectGuesses;
  const isGameWon = wordToGuess.split('').every(letter => guessedLetters.includes(letter));

  const renderHangman = () => {
    const stages = [
      "\n\n\n\n\n",
      "\n\n\n\n\n____",
      "|\n|\n|\n|\n|____",
      "_____\n|\n|\n|\n|____",
      "_____\n|   |\n|\n|\n|____",
      "_____\n|   |\n|   O\n|\n|____",
      "_____\n|   |\n|   O\n|   |\n|____",
      "_____\n|   |\n|   O\n|  /|\n|____",
      "_____\n|   |\n|   O\n|  /|\\\n|____",
      "_____\n|   |\n|   O\n|  /|\\\n|  /\n|____",
      "_____\n|   |\n|   O\n|  /|\\\n|  / \\\n|____"
    ];
    return stages[incorrectGuesses];
  };

  return (
    <div>
      {!isEmailValidated ? (
        <div>
          <h1>Enter Your Email</h1>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            style={{ padding: '10px', fontSize: '16px', width: '80%' }}
          />
          <button onClick={handleEmailSubmit} style={{ marginLeft: '10px', padding: '10px', fontSize: '16px' }}>
            Validate
          </button>
        </div>
      ) : (
        <div>
          <h1>Hangman Game with Drawing Input</h1>
          <DrawingCanvas 
            onImageSave={handleImageSave} 
            recognizedText={recognizedText} 
            onValidate={handleValidate} 
          />
          <div style={{ marginTop: '20px', color: 'black' }}>
            <h3>Word to Guess</h3>
            <h4>{displayWord()}</h4>
            <h3>Incorrect Guesses: {incorrectGuesses} / {maxIncorrectGuesses}</h3>
            <pre style={{ fontSize: '20px', lineHeight: '1.2' }}>{renderHangman()}</pre>
            {isGameOver && <h4>Game Over! The password was: {wordToGuess}</h4>}
            {isGameWon && <h4>Congratulations! You've guessed your password !</h4>}
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordResetPage;
