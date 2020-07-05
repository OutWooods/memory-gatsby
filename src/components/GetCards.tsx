import React, { useReducer, useEffect } from 'react';
import { setCards, MemoryCard } from '../store/main';
import { reducer, init, CardAction } from '../store/reducer';
import defaultData from '../store/defaultData';

interface Props {
    child: JSX.Element;
}

export interface WithCardsProps {
    cards: MemoryCard[];
    dispatch: (cardArction: CardAction) => void;
}

export const WithCards = (WrappedComponent: (withCardsProps: WithCardsProps) => JSX.Element): JSX.Element => {
    const [{ cards }, dispatch] = useReducer(reducer, {}, init);
    // TODO find a more performant way to do this
    useEffect(() => setCards(cards));
    defaultData();

    return <WrappedComponent cards={cards} dispatch={dispatch} />;
};

export default WithCards;
