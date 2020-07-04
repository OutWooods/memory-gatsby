import React, { useReducer, useEffect } from 'react';
import Layout from '../components/layout';
import { MemoryCard, setCards } from '../store/main';
import Card from '../components/card';
import { reducer, CardAction, init } from '../store/reducer';
import { showForPractise, showToday } from '../utils/cardRules';
import { CARD_ACTION } from '../store/actions';
import { isTomorrow } from 'date-fns';
import ListLink from '../components/listLink';
import defaultData from '../store/defaultData';

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
    const [{ cards }, dispatch] = useReducer(reducer, {}, init);
    // TODO find a more performant way to do this
    useEffect(() => setCards(cards));
    defaultData();

    const todaysCards = cards.filter((card) => showToday(card));
    if (todaysCards.length !== 0) {
        return (
            <Layout>
                <p>Cards you need today are: {todaysCards.map((card) => card.id).join(' ')}</p>
                {cardConstructor(todaysCards[0], dispatch)}
            </Layout>
        );
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
    const tomorrowsCards = cards.filter((card) => isTomorrow(card.nextDate)).length;
    return (
        <Layout>
            <p>Done</p>
            <ListLink to="/new">Add cards</ListLink>
            {practiseCards.length !== 0 && <ListLink to="/wrong">Add cards</ListLink>}
            <p>Tomorrow you have {tomorrowsCards} to do</p>
            {practiseCards.length !== 0 && (
                <button onClick={() => dispatch({ type: WRONG_VISIBILITY.SHOW })}>Practise wrong cards</button>
            )}
        </Layout>
    );
};

export default IndexPage;
