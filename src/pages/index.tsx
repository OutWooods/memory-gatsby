import React, { useReducer } from 'react';
import Layout from '../components/layout';
import { MemoryCard } from '../store/main';
import { startOfTomorrow, isToday, addDays } from 'date-fns';
// https://www.carlrippon.com/managing-state-in-functional-react-components-with-usereducer/ <- do this later

interface IState {
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
    const card = cards.find((card) => card.id === id);
    if (!card) {
        throw new Error();
    }

    card.incorrectCount += 1;
    card.nextDate = startOfTomorrow();
    return { cards: cards };
};

enum ADDITIONAL_DAYS {
    DAY_1 = 1,
    DAY_2 = 3,
    DAY_3 = 5,
    DAY_4 = 7,
    DAY_5 = 30,
    DEFAULT = 90,
}

const getDaysToAdd = (value: number): number => {
    const name = `DAY_${value}`;
    return ADDITIONAL_DAYS[name as keyof typeof ADDITIONAL_DAYS] || ADDITIONAL_DAYS.DEFAULT;
};

const right = (cards: MemoryCard[], id: number) => {
    const card = cards.find((card) => card.id === id);
    if (!card) {
        throw new Error();
    }

    card.correctCount += 1;
    card.nextDate = addDays(new Date(), getDaysToAdd(card.correctCount));
    return { cards: cards };
};

function reducer(state: IState, action: Action) {
    if (action.cardId) {
        switch (action.type) {
            case 'WRONG':
                return wrong(state.cards, action.cardId);
            case 'RIGHT':
                return right(state.cards, action.cardId);
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

    const [{ cards }, dispatch] = useReducer(reducer, mockState, init);

    const currentCard = cards.find((card: MemoryCard) => isToday(card.nextDate));

    const cardView = currentCard ? (
        <div>
            <p>{currentCard.id}</p>
            <button onClick={() => dispatch({ type: 'WRONG', cardId: currentCard.id })}>Wrong</button>
            <button onClick={() => dispatch({ type: 'RIGHT', cardId: currentCard.id })}>Right</button>
        </div>
    ) : (
        <p>Done</p>
    );

    return <Layout>{cardView}</Layout>;
};

export default IndexPage;
