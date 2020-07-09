import React, { useContext } from 'react';
import Layout from '../components/layout';
import { showForPractise } from '../utils/cardRules';
import AllCardsView from '../components/AllCardsView';
import { WithCardsContext } from '../cardsProvider';

const WrongPage = (): JSX.Element => {
    const { cards, practiseCard } = useContext(WithCardsContext);

    const practiseCards = cards.filter((card) => showForPractise(card));
    return (
        <Layout>
            <AllCardsView cards={practiseCards} right={practiseCard} wrong={practiseCard} title="Wrong cards" />
        </Layout>
    );
};

export default WrongPage;
