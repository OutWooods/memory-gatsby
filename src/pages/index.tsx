import React, { useReducer } from 'react';
import Layout from '../components/layout';
import { MemoryCard } from '../store/main';
import Card from '../components/card';
import { reducer, CardAction, init } from '../store/reducer';
import { showForPractise, showToday } from '../utils/cardRules';
import { CARD_ACTION, WRONG_VISIBILITY } from '../store/actions';

const mockState: MemoryCard[] = [
    {
        id: 1,
        correctCount: 1,
        incorrectCount: 0,
        nextDate: new Date(),
        isPaused: false,
        secondAttempt: undefined,
        lastAttempt: new Date(),
    },
    {
        id: 2,
        correctCount: 0,
        incorrectCount: 0,
        nextDate: new Date(),
        isPaused: true,
        secondAttempt: undefined,
        lastAttempt: new Date(),
    },
    {
        id: 3,
        correctCount: 0,
        incorrectCount: 0,
        nextDate: new Date(),
        isPaused: false,
        secondAttempt: undefined,
        lastAttempt: new Date(),
    },
];

const cardConstructor = (card: MemoryCard, dispatch: (cardAction: CardAction) => void, showPause = true) => (
    <Card
        key={card.id}
        card={card}
        wrong={(id: number) => dispatch({ type: CARD_ACTION.WRONG, cardId: id })}
        right={(id: number) => dispatch({ type: CARD_ACTION.RIGHT, cardId: id })}
        pause={showPause ? (id: number) => dispatch({ type: CARD_ACTION.PAUSE, cardId: id }) : undefined}
    ></Card>
);

const IndexPage = (): JSX.Element => {
    const [{ cards, showWrong }, dispatch] = useReducer(reducer, mockState, init);

    const currentCard = cards.find((card) => showToday(card));
    if (currentCard) {
        return <Layout>{cardConstructor(currentCard, dispatch)}</Layout>;
    }

    const pausedCards = cards.filter((card: MemoryCard) => card.isPaused);
    if (pausedCards.length !== 0) {
        return (
            <Layout>
                <p>Paused</p>
                {pausedCards.map((card) => cardConstructor(card, dispatch, false))}
            </Layout>
        );
    }

    const practiseCards = cards.filter((card) => showForPractise(card));
    if (practiseCards.length === 0 && showWrong) {
        dispatch({ type: WRONG_VISIBILITY.HIDE });
    }

    if (showWrong) {
        return (
            <Layout>
                <p>Practise</p>
                {practiseCards.map((card) => cardConstructor(card, dispatch, false))}
                <button onClick={() => dispatch({ type: WRONG_VISIBILITY.HIDE })}>Hide wrong cards</button>
            </Layout>
        );
    }

    return (
        <Layout>
            <p>Done</p>
            {practiseCards.length !== 0 && (
                <button onClick={() => dispatch({ type: WRONG_VISIBILITY.SHOW })}>Practise wrong cards</button>
            )}
        </Layout>
    );
};

export default IndexPage;
