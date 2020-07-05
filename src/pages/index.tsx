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
import { formatter } from '../utils/formatter';

const cardConstructor = (card: MemoryCard, dispatch: (cardAction: CardAction) => void) => (
    <Card
        key={card.id}
        card={card}
        wrong={(id: number) => dispatch({ type: CARD_ACTION.WRONG, cardId: id })}
        right={(id: number) => dispatch({ type: CARD_ACTION.RIGHT, cardId: id })}
        pause={(id: number) => dispatch({ type: CARD_ACTION.PAUSE, cardId: id })}
    ></Card>
);

const IndexPage = (): JSX.Element => {
    const [{ cards }, dispatch] = useReducer(reducer, {}, init);
    // TODO find a more performant way to do this
    useEffect(() => setCards(cards));
    defaultData();

    const todaysCards = cards.filter((card) => showToday(card));
    const pausedCards = cards.filter((card) => card.isPaused);
    if (todaysCards.length !== 0) {
        return (
            <Layout>
                <p>Remaining cards you need today are: {formatter(todaysCards.map((card) => card.id))}</p>
                <br />
                {cardConstructor(todaysCards[0], dispatch)}
                {pausedCards.length !== 0 && <ListLink to="/paused">Paused cards</ListLink>}
            </Layout>
        );
    }

    const practiseCards = cards.filter((card) => showForPractise(card));
    const tomorrowsCards = cards.filter((card) => isTomorrow(card.nextDate));
    return (
        <Layout>
            <p>Done</p>
            <ListLink to="/new">Add cards</ListLink>
            <br />
            {practiseCards.length !== 0 && <ListLink to="/wrong">Practise wrong cards</ListLink>}
            <p>Tomorrow you have {tomorrowsCards.length} to do</p>
            <p>Cards you need tomorrow are: {formatter(tomorrowsCards.map((card: MemoryCard) => card.id))}</p>
        </Layout>
    );
};

export default IndexPage;
