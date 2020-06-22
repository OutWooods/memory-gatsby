import React, { useReducer } from 'react';
import Layout from '../components/layout';
import { MemoryCard } from '../store/main';
import { startOfTomorrow, isToday } from 'date-fns';
// https://www.carlrippon.com/managing-state-in-functional-react-components-with-usereducer/ <- do this later

interface State {
    cards: MemoryCard[];
}

interface Action {
    type: string;
    card?: MemoryCard;
    cardId?: number;
    payload?: MemoryCard[];
}

function init(initialCards: MemoryCard[]) {
    return { cards: initialCards };
}

const wrong = (cards: MemoryCard[], id: number) => {
    const card = cards[id];
    card.incorrectCount += 1;
    card.nextDate = startOfTomorrow();
    return { cards: cards };
};

function reducer(state: State, action: Action) {
    if (action.cardId) {
        switch (action.type) {
            case 'wrong':
                return wrong(state.cards, action.cardId);
            default:
                throw new Error();
        }
    }
    if (action.payload) {
        switch (action.type) {
            case 'reset':
                return init(action.payload);
        }
    }
    return state;
}

const IndexPage = (): JSX.Element => {
    const mockState: MemoryCard[] = [
        {
            id: 1,
            correctCount: 1,
            incorrectCount: 0,
            nextDate: new Date(),
            isPaused: false,
        },
        {
            id: 2,
            correctCount: 0,
            incorrectCount: 0,
            nextDate: new Date(),
            isPaused: true,
        },
        {
            id: 3,
            correctCount: 0,
            incorrectCount: 0,
            nextDate: new Date(),
            isPaused: false,
        },
    ];

    const [cards, dispatch] = useReducer(reducer, mockState, init);

    const currentCard = cards.find((card: MemoryCard) => isToday(card.nextDate));

    return (
        <Layout>
            <h1 className="text-blue-200">Hello</h1>
            <p>{currentCard.id}</p>
        </Layout>
    );
};

export default IndexPage;
