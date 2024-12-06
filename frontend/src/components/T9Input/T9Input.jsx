import React, { useState } from "react";
import "./T9Input.css";

// Full character set to scramble
const characterSet = "ABCDEFGHIJKLMNOPQRTSUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-+/*..!:=$£%&#@'\"|(){}";

const T9Input = ({ onSubmit, placeholder = "Click to type..." }) => {
    const [inputValue, setInputValue] = useState("");
    const [currentKey, setCurrentKey] = useState(null);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [keyPressTimer, setKeyPressTimer] = useState(null);
    const [scrambledMap, setScrambledMap] = useState(initializeScrambledMap());

    // Function to initialize the scrambled T9 mapping with unique characters for each key
    function initializeScrambledMap() {
        const scramble = (count) => {
            const usedChars = new Set();
            const scrambledChars = [];
            while (scrambledChars.length < count) {
                const char = characterSet[Math.floor(Math.random() * characterSet.length)];
                if (!usedChars.has(char)) {
                    usedChars.add(char);
                    scrambledChars.push(char);
                }
            }
            return scrambledChars;
        };

        return {
            1: scramble(3), 
            2: scramble(3), 
            3: scramble(3),
            4: scramble(3),
            5: scramble(3),
            6: scramble(3),
            7: scramble(4),
            8: scramble(3),
            9: scramble(4), 
        };
    }

    // Function to handle key presses and scrambling of characters
    const handleKeyPress = (key) => {
        if (keyPressTimer) {
            clearTimeout(keyPressTimer);
        }

        if (key === currentKey) {
            const nextIndex = (currentCharIndex + 1) % scrambledMap[key].length;
            setCurrentCharIndex(nextIndex);
            setInputValue((prev) => prev.slice(0, -1) + scrambledMap[key][nextIndex]);
        } else {
            setCurrentKey(key);
            setCurrentCharIndex(0);
            setInputValue((prev) => prev + scrambledMap[key][0]);
        }

        setKeyPressTimer(setTimeout(() => finalizeKeyPress(), 1000));
    };

    const finalizeKeyPress = () => {
        if (currentKey !== null) {
            setCurrentKey(null);
            setCurrentCharIndex(0);
            setKeyPressTimer(null);
            scrambleAllKeys();
        }
    };

    const scrambleAllKeys = () => {
        setScrambledMap(initializeScrambledMap());
    };

    const handleDelete = () => {
        setInputValue((prev) => prev.slice(0, -1));
        finalizeKeyPress();
    };

    const handleSubmit = () => {
        onSubmit(inputValue);
        setInputValue("");
        finalizeKeyPress();
    };

    return (
        <div className="t9-input-container">
            <div className="t9-display">
                {inputValue || <span className="placeholder">{placeholder}</span>}
            </div>
            <div className="t9-keyboard">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((key) => (
                    <button type="button" key={key} className="t9-key" onClick={() => handleKeyPress(key)}>
                        <div className="key-number">{key}</div>
                        <div className="key-letters">{scrambledMap[key].join("")}</div>
                    </button>
                ))}
                <button type="button" className="t9-key reset" onClick={scrambleAllKeys}>Reset</button>
                <button type="button" className="t9-key delete" onClick={handleDelete}>Delete</button>
                <button type="button" className="t9-key submit" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default T9Input;
