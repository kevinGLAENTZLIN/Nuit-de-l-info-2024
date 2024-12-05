import React, { useState } from 'react';
import './MDPInput.css';

const MDPInput = ({ placeholder, inputValue, setInputValue }) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const handleInputChange = (e) => {
        if (e.target.value.length === 0) {
            setInputValue('');
            return;
        }
        if (e.target.value.length > inputValue.length) {
            let tempValue = e.target.value.slice(-1);
            setInputValue((prev) => prev + tempValue);
        } else {
            setInputValue((prev) => prev.slice(0, -1));
        }
    };

    const generateRandomString = (length) => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    };

    const getDisplayValue = () => {
        if (isPasswordVisible)
            return inputValue;
        return generateRandomString(inputValue.length);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    return (
        <div className="mdp-input-container">
            <input
                className={`input ${isPasswordVisible && inputValue.length > 0 ? 'font' : ''}`}
                type="text"
                placeholder={placeholder}
                value={getDisplayValue()}
                onChange={handleInputChange}
                onFocus={(e) => e.target.setSelectionRange(inputValue.length, inputValue.length)}
            />
                <button
                    type="button"
                    className={`toggle-button ${isPasswordVisible ? 'active' : ''}`}
                    onClick={togglePasswordVisibility}
                >
                    {isPasswordVisible ? 'Hide' : 'Show'}
                </button>
        </div>
    );
};

export default MDPInput;
