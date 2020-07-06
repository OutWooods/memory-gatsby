import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { setCards, MemoryCard, getCards } from '../store/main';

export interface WithCardsProps {
    cards: MemoryCard[];
    updateCards: Dispatch<SetStateAction<MemoryCard[]>>;
}

export const WithCards = (WrappedComponent: (withCardsProps: WithCardsProps) => JSX.Element): JSX.Element => {
    const [cards, updateCards] = useState(getCards());
    useEffect(() => setCards(cards), [cards]);

    return <WrappedComponent cards={cards} updateCards={updateCards} />;
};

export default WithCards;
