import React, { useReducer } from 'react';
import Layout from '../components/layout';
import { MemoryCard } from '../store/main';
import Card from '../components/card';
import { isToday } from 'date-fns';
import { reducer, CardAction, init } from '../store/reducer';

const mockState: MemoryCard[] = [
    {
        id: 1,
        correctCount: 1,
        incorrectCount: 0,
        nextDate: new Date(),
        isPaused: false,
    },
    {
        id: 2,
        correctCount: 0,
        incorrectCount: 0,
        nextDate: new Date(),
        isPaused: true,
    },
    {
        id: 3,
        correctCount: 0,
        incorrectCount: 0,
        nextDate: new Date(),
        isPaused: false,
    },
];

const cardConstructor = (card: MemoryCard, dispatch: (cardAction: CardAction) => void, showPause = true) => (
    <Card
        card={card}
        wrong={(id: number) => dispatch({ type: 'WRONG', cardId: id })}
        right={(id: number) => dispatch({ type: 'RIGHT', cardId: id })}
        pause={showPause ? (id: number) => dispatch({ type: 'PAUSE', cardId: id }) : undefined}
    ></Card>
);

const IndexPage = (): JSX.Element => {
    const [{ cards }, dispatch] = useReducer(reducer, mockState, init);

    const currentCard = cards.find((card: MemoryCard) => isToday(card.nextDate) && !card.isPaused);
    if (currentCard) {
        return <Layout>{cardConstructor(currentCard, dispatch)}</Layout>;
    }

    const pausedCards = cards.filter((card: MemoryCard) => card.isPaused);
    if (pausedCards.length !== 0) {
        return <Layout>{pausedCards.map((card) => cardConstructor(card, dispatch, false))}</Layout>;
    }

    return (
        <Layout>
            <p>Done</p>
        </Layout>
    );
};

export default IndexPage;
