import React, { useState, useEffect, useRef } from 'react';
import './EMailInput.css';
import T9Input from "../T9Input/T9Input";

const EMailInput = ({ placeholder, inputValue, setInputValue }) => {
    const [showT9, setShowT9] = useState(false); // Whether the T9 popup is visible
    const t9ContainerRef = useRef(null); // Ref for the T9 popup
    const inputRef = useRef(null); // Ref for the email input field
    // Show the T9 keyboard only when the EMailInput gains focus
    const handleEmailFocus = () => {
        console.log("Email input focused");
        if (!showT9) {
            setShowT9(true); // Show T9 only if it's not already visible
        }
    };

    // Update the email input value when the T9 keyboard submits
    const handleT9Submit = (value) => {
        setInputValue(value); // Update the email field
        setShowT9(false); // Hide the T9 keyboard
    };

    // Handle clicking outside the T9 popup or input field to close the T9 keyboard
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                t9ContainerRef.current && !t9ContainerRef.current.contains(event.target) &&
                inputRef.current && !inputRef.current.contains(event.target) // Ensure the click is not on the input field itself
            ) {
                console.log("Click detected outside, hiding T9 keyboard");
                setShowT9(false); // Close T9 when clicking outside
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
                ref={inputRef} // Attach ref to the input field
                type="text"
                placeholder={placeholder}
                value={inputValue} // Bind input value to the state
                onFocus={handleEmailFocus} // Trigger T9 keyboard on focus
                readOnly // Prevent editing inside the input field
            />
            {/* T9 Popup */}                                                                                                                                                                                                                                                                                                
            {showT9 && (
                <div ref={t9ContainerRef} className="t9-popup">
                    <T9Input onSubmit={handleT9Submit} placeholder="Enter email..." />
                </div>
            )}
        </div>
    );
};

export default EMailInput;
