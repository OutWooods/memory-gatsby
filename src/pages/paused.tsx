import React from 'react';
import Layout from '../components/layout';
import { MemoryCard } from '../store/main';
import AllCardsView from '../components/AllCardsView';
import WithCards, { WithCardsProps } from '../components/GetCards';
import { right, wrong } from '../utils/cards';

const PausedPage = ({ cards, updateCards }: WithCardsProps): JSX.Element => {
    const pausedCards = cards.filter((card: MemoryCard) => card.isPaused);
    const markRight = (id: number): void => updateCards(right(cards, id));
    const markWrong = (id: number): void => updateCards(wrong(cards, id));
    return (
        <Layout>
            <AllCardsView cards={pausedCards} right={markRight} wrong={markWrong} title="Paused" />
        </Layout>
    );
};

export default (): JSX.Element => WithCards(PausedPage);
