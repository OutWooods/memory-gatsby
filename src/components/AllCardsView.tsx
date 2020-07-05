import React from 'react';
import { MemoryCard } from '../store/main';
import Card from '../components/card';
import { CardAction } from '../store/reducer';
import { CARD_ACTION } from '../store/actions';

interface Props {
    cards: MemoryCard[];
    dispatch: (cardAction: CardAction) => void;
    title: string;
}

const cardConstructor = (card: MemoryCard, dispatch: (cardAction: CardAction) => void) => (
    <Card
        key={card.id}
        card={card}
        wrong={(id: number) => dispatch({ type: CARD_ACTION.WRONG, cardId: id })}
        right={(id: number) => dispatch({ type: CARD_ACTION.RIGHT, cardId: id })}
    ></Card>
);

const AllCardsView = ({ cards, dispatch, title }: Props): JSX.Element => {
    return (
        <div>
            <p>{title}</p>
            {cards.map((card) => cardConstructor(card, dispatch))}
        </div>
    );
};

export default AllCardsView;
