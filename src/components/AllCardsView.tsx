import React from 'react';
import { MemoryCard } from '../store/main';
import Card from '../components/card';

interface Props {
    cards: MemoryCard[];
    right: (id: number) => void;
    wrong: (id: number) => void;
    title: string;
}

const cardConstructor = (right: (id: number) => void, wrong: (id: number) => void, card: MemoryCard) => (
    <Card key={card.id} card={card} wrong={() => wrong(card.id)} right={() => right(card.id)}></Card>
);

const AllCardsView = ({ cards, right, wrong, title }: Props): JSX.Element => {
    return (
        <div>
            <p>{title}</p>
            {cards.map((card) => cardConstructor(right, wrong, card))}
        </div>
    );
};

export default AllCardsView;
