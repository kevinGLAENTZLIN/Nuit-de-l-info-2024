import React, { useState, useEffect } from 'react';
import { animated, useSprings } from 'react-spring';
import { useInterval } from 'usehooks-ts'
import './CaptchaPage.css';

import mario from "../../assets/sm64ds_mario.png";
import yoshi from "../../assets/sm64ds_yoshi.png";
import luigi from "../../assets/sm64ds_luigi.png";
import wario from "../../assets/sm64ds_wario.png";

const characters = [mario, luigi, yoshi, wario];

const getRandomCharacter = () => {
    return characters[Math.floor(Math.random() * characters.length)];
};

const getCharacterToSpawn = (characterToFind) => {
    const tmp = getRandomCharacter();

    if (Math.random() < 0.5) {
        if (characterToFind === mario && tmp !== wario) return wario;
        if (characterToFind === wario && tmp !== mario) return mario;
        if (characterToFind === luigi && tmp !== yoshi) return yoshi;
        if (characterToFind === yoshi && tmp !== luigi) return luigi;
    }

    if (tmp !== characterToFind) return tmp;

    return getCharacterToSpawn(characterToFind);
};


const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const directions = [
    { dx: 0.35, dy: 0.35 },
    { dx: 0.35, dy: -0.35 },
    { dx: -0.35, dy: 0.35 },
    { dx: -0.35, dy: -0.35 }
];

const moveCharacters = (positions) => {
    return positions.map((pos) => {
        let { x, y, dx, dy } = pos;

        x += dx;
        y += dy;

        if (x < 0 || x > 90) dx = -dx;
        if (y < 0 || y > 70) dy = -dy;

        return { x, y, dx, dy };
    });
};

const CaptchaPage = () => {
    const [targetCharacter, setTargetCharacter] = useState(getRandomCharacter());
    const [grid, setGrid] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const newGrid = [targetCharacter];
        
        for (let i = 0; i < 70; i++) {
            newGrid.push(getCharacterToSpawn(targetCharacter));
        }
        setGrid(shuffleArray(newGrid));
    }, [targetCharacter]);
    

    const handleCharacterClick = (character) => {
        if (character === targetCharacter) {
            setSuccess(true);
        }
    };

    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const initialPositions = grid.map(() => ({
            x: Math.random() * 90,
            y: Math.random() * 70,
            ...directions[Math.floor(Math.random() * directions.length)]
        }));
        setPositions(initialPositions);
    }, [grid]);

    useInterval(() => {
        setPositions((positions) => moveCharacters(positions));
    }, 20);

    const springs = useSprings(
        positions.length,
        positions.map(pos => ({
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            config: { tension: 180, friction: 12 }
        }))
    );

    return (
        <div className="captcha-container">
            {!success ? (
                <div className="captcha-box">
                    <div className="target-container">
                        <p>Find and click the target character:</p>
                        <img 
                            src={targetCharacter} 
                            alt="target character"
                            className="target-image"
                        />
                    </div>
                    <div className="grid-container">
                        {grid.map((character, index) => (
                            <animated.div
                                key={index}
                                className="grid-item"
                                onClick={() => handleCharacterClick(character)}
                                style={springs[index]}
                            >
                                <img
                                    src={character}
                                    alt="character"
                                    className="character-image"
                                />
                            </animated.div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="success-message">You are verified!</p>
            )}
        </div>
    );
};

export default CaptchaPage;