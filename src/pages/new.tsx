import React, { useReducer, useEffect } from 'react';
import Layout from '../components/layout';
import { setCards } from '../store/main';
import { reducer, init } from '../store/reducer';
import { isTomorrow } from 'date-fns';
import { CARD_ACTION } from '../store/actions';

const IndexPage = (): JSX.Element => {
    const [{ cards }, dispatch] = useReducer(reducer, {}, init);
    // TODO find a more performant way to do this
    useEffect(() => setCards(cards));

    const tomorrowsCards = cards.filter((card) => isTomorrow(card.nextDate)).length;
    return (
        <Layout>
            <p>Add cards</p>
            <p>Tomorrow you have {tomorrowsCards} to do</p>
            <button onClick={() => dispatch({ type: CARD_ACTION.ADD })}> Hey</button>
        </Layout>
    );
};

export default IndexPage;
