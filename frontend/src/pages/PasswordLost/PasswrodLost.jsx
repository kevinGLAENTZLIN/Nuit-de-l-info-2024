import React, { useState } from 'react';
import DrawingCanvas from '../../components/DrawingCanvas/DrawingCanvas.jsx';
import Tesseract from "tesseract.js";

const PasswordResetPage = () =>{
  
  const [email, setEmail] = useState("");
  const [isEmailValidated, setIsEmailValidated] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [wordToGuess, setWordToGuess] = useState("REACT");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const maxIncorrectGuesses = 9;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/user/u', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsEmailValidated(true);
      } else {
        alert('Failed to validate email. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('An error occurred. Please try again.');
    }
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
    setRecognizedText(""); // Reset after validation
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
            style={{ padding: '10px', fontSize: '16px' }}
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
          <div style={{ marginTop: '20px' }}>
            <h2>Word to Guess</h2>
            <p>{displayWord()}</p>
            <h3>Incorrect Guesses: {incorrectGuesses} / {maxIncorrectGuesses}</h3>
            <pre style={{ fontSize: '20px', lineHeight: '1.2' }}>{renderHangman()}</pre>
            {isGameOver && <p>Game Over! The word was: {wordToGuess}</p>}
            {isGameWon && <p>Congratulations! You've guessed the word!</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordResetPage;
