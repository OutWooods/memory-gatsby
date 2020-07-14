import React, { useContext } from 'react';
import Layout from '../components/layout';
import { MemoryCard } from '../store/main';
import Card from '../components/card';
import { showForPractise, showToday } from '../utils/cardRules';
import { isTomorrow, differenceInMilliseconds } from 'date-fns';
import ListLink from '../components/listLink';
import { formatter } from '../utils/formatter';
import AllCardsView from '../components/AllCardsView';
import { WithCardsContext } from '../cardsProvider';

export interface MarkCardActions {
    markWrong: (id: number) => void;
    markRight: (id: number) => void;
    markPause: (id: number) => void;
}

const cardConstructor = (card: MemoryCard, { markRight, markWrong, markPause }: MarkCardActions) => (
    <Card
        key={card.id}
        card={card}
        wrong={() => markWrong(card.id)}
        right={() => markRight(card.id)}
        pause={() => markPause(card.id)}
    ></Card>
);

const IndexPage = (): JSX.Element => {
    const { cards, markRight, markWrong, markPause } = useContext(WithCardsContext);

    const todaysCards = cards
        .filter((card) => showToday(card))
        .sort((a, b) => -1 * differenceInMilliseconds(a.nextDate, b.nextDate));
    const pausedCards = cards.filter((card) => card.isPaused);
    if (todaysCards.length !== 0) {
        return (
            <Layout>
                <p>Remaining cards you need today are: {formatter(todaysCards.map((card) => card.id))}</p>
                <br />
                {cardConstructor(todaysCards[0], { markRight, markWrong, markPause })}
                {pausedCards.length !== 0 && <ListLink to="/paused">Paused cards</ListLink>}
            </Layout>
        );
    }

    if (pausedCards.length !== 0) {
        return (
            <Layout>
                <AllCardsView cards={pausedCards} right={markRight} wrong={markWrong} title="Paused" />
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
