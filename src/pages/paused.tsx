import React, { useContext } from 'react';
import Layout from '../components/layout';
import { MemoryCard } from '../store/main';
import AllCardsView from '../components/AllCardsView';
import { WithCardsContext } from '../cardsProvider';

const PausedPage = (): JSX.Element => {
    const { cards, markRight, markWrong } = useContext(WithCardsContext);
    const pausedCards = cards.filter((card: MemoryCard) => card.isPaused);

    return (
        <Layout>
            <AllCardsView cards={pausedCards} right={markRight} wrong={markWrong} title="Paused" />
        </Layout>
    );
};

export default PausedPage;
