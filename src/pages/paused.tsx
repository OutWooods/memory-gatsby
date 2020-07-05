import React from 'react';
import Layout from '../components/layout';
import { MemoryCard } from '../store/main';
import AllCardsView from '../components/AllCardsView';
import WithCards, { WithCardsProps } from '../components/GetCards';

const PausedPage = ({ cards, dispatch }: WithCardsProps): JSX.Element => {
    const pausedCards = cards.filter((card: MemoryCard) => card.isPaused);
    return (
        <Layout>
            <AllCardsView cards={pausedCards} dispatch={dispatch} title="Paused" />
        </Layout>
    );
};

export default (): JSX.Element => WithCards(PausedPage);
