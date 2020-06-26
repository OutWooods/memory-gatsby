import React, { useReducer, useEffect } from 'react';
import Layout from '../components/layout';
import { setCards } from '../store/main';
import { reducer, init } from '../store/reducer';
import { isTomorrow } from 'date-fns';

const IndexPage = (): JSX.Element => {
    const [{ cards }] = useReducer(reducer, {}, init);
    // TODO find a more performant way to do this
    useEffect(() => setCards(cards));

    const tomorrowsCards = cards.filter((card) => isTomorrow(card.nextDate)).length;
    return (
        <Layout>
            <p>Add cards</p>
            <p>Tomorrow you have {tomorrowsCards} to do</p>
        </Layout>
    );
};

export default IndexPage;
