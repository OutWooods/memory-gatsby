import React, { useContext } from 'react';
import Layout from '../components/layout';
import { differenceInMilliseconds } from 'date-fns';
import { WithCardsContext } from '../cardsProvider';
import { formatRelative } from 'date-fns/esm';

const IndexPage = (): JSX.Element => {
    const { cards, markWrong } = useContext(WithCardsContext);

    const cardComponents = cards
        .sort((a, b) => differenceInMilliseconds(a.nextDate, b.nextDate))
        .map((card) => (
            <div key={card.id} className="m-4 w-1/3">
                <p>Card No:{card.id}</p>
                <p>Correct count: {card.correctCount}</p>
                <p>{formatRelative(card.nextDate, new Date())}</p>
                <button onClick={() => markWrong(card.id)}>Reset</button>
            </div>
        ));

    console.log(cardComponents);
    return (
        <Layout>
            <p>Edit cards</p>
            <div className="flex flex-wrap">{cardComponents}</div>
        </Layout>
    );
};

export default IndexPage;
