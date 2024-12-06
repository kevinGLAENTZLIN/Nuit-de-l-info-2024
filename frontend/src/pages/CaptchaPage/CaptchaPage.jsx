import React, { useState, useEffect } from 'react';
import { animated, useSprings } from 'react-spring';
import { useInterval } from 'usehooks-ts';
import './CaptchaPage.css';

import mario from "../../assets/sm64ds_mario.png";
import yoshi from "../../assets/sm64ds_yoshi.png";
import luigi from "../../assets/sm64ds_luigi.png";
import wario from "../../assets/sm64ds_wario.png";

import mario_to_find from "../../assets/sm64ds_mario_to_find.png";
import yoshi_to_find from "../../assets/sm64ds_yoshi_to_find.png";
import luigi_to_find from "../../assets/sm64ds_luigi_to_find.png";
import wario_to_find from "../../assets/sm64ds_wario_to_find.png";

const characters = [mario, luigi, yoshi, wario];
const characters_to_find = [mario_to_find, luigi_to_find, yoshi_to_find, wario_to_find];

const getRandomCharacterToFind = () => {
    return Math.floor(Math.random() * characters.length);
};

const getRandomCharacterToSpawn = (characterToFind) => {
    const tmp = characters[Math.floor(Math.random() * characters.length)];

    if (Math.random() < 0.5) {
        if (characterToFind === mario && tmp !== wario) return wario;
        if (characterToFind === wario && tmp !== mario) return mario;
        if (characterToFind === luigi && tmp !== yoshi) return yoshi;
        if (characterToFind === yoshi && tmp !== luigi) return luigi;
    }

    if (tmp !== characterToFind) return tmp;

    return getRandomCharacterToSpawn(characterToFind);
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

const CaptchaPage = ( {onComplete} ) => {
    const [targetCharacter] = useState(getRandomCharacterToFind());
    const [grid, setGrid] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const targetChar = characters[targetCharacter];
        const newGrid = [targetChar];
        for (let i = 0; i < 70; i++) {
            newGrid.push(getRandomCharacterToSpawn(targetChar));
        }
        setGrid(shuffleArray(newGrid));
    }, [targetCharacter]);

    const handleCharacterClick = (character) => {
        if (character === characters[targetCharacter]) {
            setSuccess(true);
            onComplete();
        }
    };

    const [positions, setPositions] = useState([]);
    const [styles, setStyles] = useState(() => {
        const saturation = Math.random() * 100 + 100;
        const contrast = Math.random() * 100 + 100;
        const brightness = Math.random() * 50 + 100;

        const stretchHorizontal = (Math.random() * 5 + 10) / 10;
        const stretchVertical = (Math.random() * 5 + 10) / 10;
        const rotation = (Math.random() * 90) - 45;
        const skewX = (Math.random() * 90) - 45;
        const skewY = (Math.random() * 90) - 45;

        return {
            filter: `saturate(${saturation}%) contrast(${contrast}%) brightness(${brightness}%)`,
            transform: `scale(${stretchHorizontal}, ${stretchVertical}) rotate(${rotation}deg) skew(${skewX}deg, ${skewY}deg)`
        };
    });

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
                            src={characters_to_find[targetCharacter]} 
                            alt="target  character"
                            className="target-image"
                        />
                    </div>
                    <div className="grid-container">
                        {grid.map((character, index) => (
                            <animated.div
                                key={index}
                                className="grid-item"
                                onClick={() => handleCharacterClick(character)}
                                style={{ ...springs[index], ...styles }}
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
