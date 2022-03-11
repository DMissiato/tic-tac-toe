
import { useEffect, useState } from 'react';
import Box from '../Box';
import styles from './Grid.module.scss';

const WINNING_PATHS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const checkIfWin = (boxes) =>
{
    let win = null;

    for (let i = 0; i < WINNING_PATHS.length; i++) 
    {   
        const [x, y, z] = WINNING_PATHS[i];
        if(boxes[x] && boxes[x] === boxes[y] && boxes[y] === boxes[z])
        {
            win = boxes[x];
            break;
        }
    }

    return win;
}

// Component
const Grid = () => 
{
    const [values, setValues] = useState(Array(9).fill(null));
    const [isTurnX, setIsTurnX] = useState(true);
    const [isGameOver, setIsGameOver] = useState(false);
    const [winner, setWinner] = useState(null);


    useEffect(() => 
    {
        setWinner(checkIfWin(values));
        
        if(!values.includes(null))
        {
            setIsGameOver(true);
        }
    }, [isTurnX]);

    useEffect(() => 
    {
        if(winner)
        {
            setIsGameOver(true);
        }
    }, [winner]);

    
    const handleBoxClick = (i) =>
    {
        if(!values[i])
        {
            setValues(state => {
                state[i] = isTurnX ? 'x' : 'o';
                return state;
            });
            setIsTurnX(state => !state);
        }
    }

    const handleTryAgain = () =>
    {
        setValues(Array(9).fill(null));
        if(!isTurnX) setIsTurnX(true);
        if(winner) setWinner(null);
        setIsGameOver(false);
    }


    return (
        isGameOver ?
            <>
                <h2>
                    {
                        winner ?
                            <>The winner is {winner.toUpperCase()}!</>
                        :
                            <>Draw.</>
                    }
                </h2>
                <button onClick={handleTryAgain}>Try Again</button>
            </>
        :
            <div className={styles.wrapper}>
                {
                    values.map((value, index) => (
                        <Box handleClick={() => handleBoxClick(index)} value={value} key={index} />
                    ))
                }
            </div>
    );
}

export default Grid;