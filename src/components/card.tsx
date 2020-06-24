import React from 'react';
import { MemoryCard } from '../store/main';

interface Props {
    card: MemoryCard;
    right: (id: number) => void;
    wrong: (id: number) => void;
    pause?: (id: number) => void;
}

const Card = ({ card, right, wrong, pause }: Props): JSX.Element => (
    <div>
        <p>{card.id}</p>
        <button onClick={() => right(card.id)}>Right</button>
        <button onClick={() => wrong(card.id)}>Wrong</button>
        {pause && <button onClick={() => pause(card.id)}>Pause</button>}
    </div>
);

export default Card;
