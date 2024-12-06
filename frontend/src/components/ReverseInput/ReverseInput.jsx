import React from 'react';
import './ReverseInput.css';

const ReverseInput = ({ placeholder, inputValue, setInputValue }) => {

    const handleChange = (e) => {
        setInputValue(e.target.value)
    };

    return (
        <div>
            <input
                type={'text'}
                placeholder={placeholder}
                value={inputValue.split('').reverse().join('')}
                onChange={handleChange}
            />
        </div>
    );
};

export default ReverseInput;
