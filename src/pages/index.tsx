import React, { Dispatch, SetStateAction } from 'react';
import Layout from '../components/layout';
import { MemoryCard } from '../store/main';
import Card from '../components/card';
import { showForPractise, showToday } from '../utils/cardRules';
import { isTomorrow } from 'date-fns';
import ListLink from '../components/listLink';
import { formatter } from '../utils/formatter';
import AllCardsView from '../components/AllCardsView';
import WithCards, { WithCardsProps } from '../components/GetCards';
import { right, wrong, pause } from '../utils/cards';

const cardConstructor = (
    cards: MemoryCard[],
    card: MemoryCard,
    updateCards: Dispatch<SetStateAction<MemoryCard[]>>,
) => (
    <Card
        key={card.id}
        card={card}
        wrong={(): void => updateCards(wrong(cards, card.id))}
        right={(): void => updateCards(right(cards, card.id))}
        pause={(): void => updateCards(pause(cards, card.id))}
    ></Card>
);

const IndexPage = ({ cards, updateCards }: WithCardsProps): JSX.Element => {
    const todaysCards = cards.filter((card) => showToday(card));
    const pausedCards = cards.filter((card) => card.isPaused);
    if (todaysCards.length !== 0) {
        return (
            <Layout>
                <p>Remaining cards you need today are: {formatter(todaysCards.map((card) => card.id))}</p>
                <br />
                {cardConstructor(cards, todaysCards[0], updateCards)}
                {pausedCards.length !== 0 && <ListLink to="/paused">Paused cards</ListLink>}
            </Layout>
        );
    }

    if (pausedCards.length !== 0) {
        return (
            <Layout>
                <AllCardsView cards={cards} specificCards={pausedCards} updateCards={updateCards} title="Paused" />
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
