// src/hooks/useCharacterPositions.js
import { useState, useEffect } from 'react';
import { useSprings } from 'react-spring';
import useInterval from '@use-it/interval';

const directions = [
    { dx: 1, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: -1, dy: 1 },
    { dx: -1, dy: -1 }
];

const moveCharacters = (positions) => {
    return positions.map((pos) => {
        let { x, y, dx, dy } = pos;

        x += dx;
        y += dy;

        if (x < 0 || x > 90) dx = -dx;
        if (y < 0 || y > 90) dy = -dy;

        return { x, y, dx, dy };
    });
};

const useCharacterPositions = (grid) => {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const initialPositions = grid.map(() => ({
            x: Math.random() * 90,
            y: Math.random() * 90,
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

    return springs;
};

export default useCharacterPositions;
