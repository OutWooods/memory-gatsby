import React, { useEffect, useState } from 'react';
import { addCard } from '../utils/cards';
import Layout from '../components/layout';
import { setCards, getCards } from '../store/main';
import { isTomorrow } from 'date-fns';
import { MAX_CARDS } from '../utils/cardRules';

const IndexPage = (): JSX.Element => {
    const [cards, updateCards] = useState(getCards());
    const newCard = (): void => updateCards(addCard(cards));
    useEffect(() => setCards(cards), [cards]);

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
                    <button onClick={newCard}>Add Card</button>
                </div>
            ) : (
                <p>Max cards for day added</p>
            )}
        </Layout>
    );
};

export default IndexPage;
