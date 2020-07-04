import React, { useReducer, useEffect } from 'react';
import Layout from '../components/layout';
import { MemoryCard, setCards } from '../store/main';
import Card from '../components/card';
import { reducer, CardAction, init } from '../store/reducer';
import { showForPractise } from '../utils/cardRules';
import { CARD_ACTION } from '../store/actions';
import defaultData from '../store/defaultData';

const cardConstructor = (card: MemoryCard, dispatch: (cardAction: CardAction) => void, showPause = true) => (
    <Card
        key={card.id}
        card={card}
        wrong={(id: number) => dispatch({ type: CARD_ACTION.WRONG, cardId: id })}
        right={(id: number) => dispatch({ type: CARD_ACTION.RIGHT, cardId: id })}
        pause={showPause ? (id: number) => dispatch({ type: CARD_ACTION.PAUSE, cardId: id }) : undefined}
    ></Card>
);

const WrongPage = (): JSX.Element => {
    const [{ cards }, dispatch] = useReducer(reducer, {}, init);
    // TODO find a more performant way to do this
    useEffect(() => setCards(cards));
    defaultData();

    const practiseCards = cards.filter((card) => showForPractise(card));
    return (
        <Layout>
            <p>Practise</p>
            {practiseCards.length === 0 ? (
                <p>No cards to practise yet</p>
            ) : (
                practiseCards.map((card) => cardConstructor(card, dispatch, false))
            )}
        </Layout>
    );
};

export default WrongPage;
