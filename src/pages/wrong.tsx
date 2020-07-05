import React from 'react';
import Layout from '../components/layout';
import { showForPractise } from '../utils/cardRules';
import AllCardsView from '../components/AllCardsView';
import WithCards, { WithCardsProps } from '../components/GetCards';

const WrongPage = ({ cards, dispatch }: WithCardsProps): JSX.Element => {
    const practiseCards = cards.filter((card) => showForPractise(card));
    return (
        <Layout>
            <AllCardsView cards={practiseCards} dispatch={dispatch} title="Wrong cards" />
        </Layout>
    );
};

export default (): JSX.Element => WithCards(WrongPage);
