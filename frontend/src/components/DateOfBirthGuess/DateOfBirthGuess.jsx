import React, { useState } from 'react';

const DateOfBirthGuess = () => {
    const [lowerBound, setLowerBound] = useState(new Date(1900, 0, 1));
    const [upperBound, setUpperBound] = useState(new Date());
    const [guess, setGuess] = useState(new Date());
    const [message, setMessage] = useState("Devinez votre date de naissance !");
    const [correctDateFound, setCorrectDateFound] = useState(false);

    const generateRandomDate = (start, end) => {
        const randomTime = Math.random() * (end - start) + start;
        return new Date(randomTime);
    };

    const makeGuess = React.useCallback(() => {
        const newGuess = generateRandomDate(lowerBound.getTime(), upperBound.getTime());
        setGuess(newGuess);
    }, [lowerBound, upperBound]);

    const handleResponse = (response) => {
        if (response === 'older') {
            setUpperBound(new Date(guess.getTime() - 1));
            setMessage("Plus ancienne !");
        } else if (response === 'younger') {
            setLowerBound(new Date(guess.getTime() + 1));
            setMessage("Plus récente !");
        } else {
            setMessage(`Bravo ! Votre date de naissance est : ${guess.toDateString()}`);
            setCorrectDateFound(true);
        }
    };
    const handleReset = () => {
        setLowerBound(new Date(1900, 0, 1));
        setUpperBound(new Date());
        setCorrectDateFound(false);
        setMessage("Devinez votre date de naissance !");
        makeGuess();
    };

    React.useEffect(() => {
        makeGuess();
    }, [lowerBound, upperBound, makeGuess]);


    return (
        <div>
            <h1>{message}</h1>
            {correctDateFound === false ? (
                <div>
                    <h3>Date proposée : {guess.toDateString()}</h3>
                    <button
                        onClick={() => handleResponse('older')}
                        style={{ fontSize: '30px', padding: '20px', margin: '10px' }}
                    >
                        👴
                    </button>
                    <button
                        onClick={() => handleResponse('younger')}
                        style={{ fontSize: '30px', padding: '20px', margin: '10px' }}
                    >
                        🧑
                    </button>
                    <button
                        onClick={() => handleResponse('correct')}
                        style={{ fontSize: '30px', padding: '20px', margin: '10px' }}
                    >
                        👨
                    </button>
                </div>
            ) : null}
                <button
                    onClick={handleReset}
                    style={{ fontSize: '20px', padding: '15px', marginTop: '20px' }}
                >
                    🔄 Réinitialiser
                </button>
        </div>
    );
};

export default DateOfBirthGuess;
