import React, { useEffect, useState } from 'react';
import { setCards, MemoryCard, getCards } from './store/main';
import { wrong, right, pause, practise, addCard } from './utils/cards';

export interface WithCardsProps {
    cards: MemoryCard[];
    markWrong: (id: number) => void;
    markRight: (id: number) => void;
    markPause: (id: number) => void;
    practiseCard: (id: number) => void;
    newCard: () => void;
}

export const WithCardsContext = React.createContext<WithCardsProps>({
    cards: [],
    markWrong: (id: number) => {
        console.log(id);
    },
    markRight: (id: number) => {
        console.log(id);
    },
    markPause: (id: number) => {
        console.log(id);
    },
    practiseCard: (id: number) => {
        console.log(id);
    },
    newCard: () => console.log(),
});

const CardsProvider = ({ children }: { children: JSX.Element }) => {
    const [cards, updateCards] = useState(getCards());
    useEffect(() => setCards(cards), [cards]);

    const markWrong = (id: number): void => updateCards(wrong(cards, id));
    const markRight = (id: number): void => updateCards(right(cards, id));
    const markPause = (id: number): void => updateCards(pause(cards, id));
    const practiseCard = (id: number): void => updateCards(practise(cards, id));
    const newCard = (): void => updateCards(addCard(cards));

    const value = { cards, markWrong, markRight, markPause, practiseCard, newCard };

    return <WithCardsContext.Provider value={value}>{children}</WithCardsContext.Provider>;
};

// eslint-disable-next-line react/display-name
export default ({ element }: { element: JSX.Element }): JSX.Element => <CardsProvider>{element}</CardsProvider>;
