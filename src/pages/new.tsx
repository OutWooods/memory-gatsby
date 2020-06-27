import React, { useReducer, useEffect } from 'react';
import Layout from '../components/layout';
import { setCards } from '../store/main';
import { reducer, init } from '../store/reducer';
import { isTomorrow } from 'date-fns';
import { CARD_ACTION } from '../store/actions';
import { MAX_CARDS } from '../utils/cardRules';

const IndexPage = (): JSX.Element => {
    const [{ cards }, dispatch] = useReducer(reducer, {}, init);
    // TODO find a more performant way to do this
    useEffect(() => setCards(cards));

    const tomorrowsCards = cards.filter((card) => isTomorrow(card.nextDate)).length;
    const newCards = cards.filter((card) => !card.lastAttempt).length;
    return (
        <Layout>
            <p>Add cards</p>
            <p className={tomorrowsCards >= MAX_CARDS.TOTAL ? 'text-red-400' : ''}>
                Tomorrow you have {tomorrowsCards} to do{' '}
                {tomorrowsCards >= MAX_CARDS.TOTAL && 'probably dont add too many new ones'}
            </p>
            {newCards !== 0 && (
                <p>
                    You have added {newCards} today ({MAX_CARDS.NEW} is the max)
                </p>
            )}
            {newCards < MAX_CARDS.NEW ? (
                <div>
                    <p>Next card number will be {cards.length + 1}</p>
                    <button onClick={() => dispatch({ type: CARD_ACTION.ADD })}>Add Card</button>
                </div>
            ) : (
                <p>Max cards for day added</p>
            )}
        </Layout>
    );
};

export default IndexPage;
