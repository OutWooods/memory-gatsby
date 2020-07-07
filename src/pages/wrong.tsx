import React from 'react';
import Layout from '../components/layout';
import { showForPractise } from '../utils/cardRules';
import AllCardsView from '../components/AllCardsView';
import WithCards, { WithCardsProps } from '../components/GetCards';
import { practise } from '../utils/cards';

const WrongPage = ({ cards, updateCards }: WithCardsProps): JSX.Element => {
    const practiseCards = cards.filter((card) => showForPractise(card));
    const practiseCard = (id: number): void => updateCards(practise(cards, id));
    return (
        <Layout>
            <AllCardsView cards={practiseCards} right={practiseCard} wrong={practiseCard} title="Wrong cards" />
        </Layout>
    );
};

export default (): JSX.Element => WithCards(WrongPage);
