import React, { useState, useEffect, useRef } from 'react';
import './EMailInput.css';
import T9Input from "../T9Input/T9Input";

const EMailInput = ({ placeholder, inputValue, setInputValue }) => {
    const [showT9, setShowT9] = useState(false);
    const t9ContainerRef = useRef(null);
    const inputRef = useRef(null);
    const handleEmailFocus = () => {
        console.log("Email input focused");
        if (!showT9) {
            setShowT9(true);
        }
    };

    const handleT9Submit = (value) => {
        setInputValue(value);
        setShowT9(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                t9ContainerRef.current && !t9ContainerRef.current.contains(event.target) &&
                inputRef.current && !inputRef.current.contains(event.target)
            ) {
                console.log("Click detected outside, hiding T9 keyboard");
                setShowT9(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        console.log("T9 visibility:", showT9);
    }, [showT9]);

    return (
        <div>
            <input
                style={{width:"90%"}}
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onFocus={handleEmailFocus}
                readOnly
            />
            {showT9 && (
                <div ref={t9ContainerRef} className="t9-popup">
                    <T9Input onSubmit={handleT9Submit} placeholder="Enter email..." />
                </div>
            )}
        </div>
    );
};

export default EMailInput;
