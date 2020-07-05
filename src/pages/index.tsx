import React from 'react';
import Layout from '../components/layout';
import { MemoryCard } from '../store/main';
import Card from '../components/card';
import { CardAction } from '../store/reducer';
import { showForPractise, showToday } from '../utils/cardRules';
import { CARD_ACTION } from '../store/actions';
import { isTomorrow } from 'date-fns';
import ListLink from '../components/listLink';
import { formatter } from '../utils/formatter';
import AllCardsView from '../components/AllCardsView';
import WithCards, { WithCardsProps } from '../components/GetCards';

const cardConstructor = (card: MemoryCard, dispatch: (cardAction: CardAction) => void) => (
    <Card
        key={card.id}
        card={card}
        wrong={(id: number) => dispatch({ type: CARD_ACTION.WRONG, cardId: id })}
        right={(id: number) => dispatch({ type: CARD_ACTION.RIGHT, cardId: id })}
        pause={(id: number) => dispatch({ type: CARD_ACTION.PAUSE, cardId: id })}
    ></Card>
);

const IndexPage = ({ cards, dispatch }: WithCardsProps): JSX.Element => {
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

    if (pausedCards.length !== 0) {
        return (
            <Layout>
                <AllCardsView cards={pausedCards} dispatch={dispatch} title="Paused" />
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

export default (): JSX.Element => WithCards(IndexPage);
