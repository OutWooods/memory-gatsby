import { MemoryCard, getCards } from './main';
import { wrong, right, pause, practise, addCard } from '../utils/cards';
import { isBefore, endOfToday } from 'date-fns';
import { CARD_ACTION, DEFAULT_ACTION } from './actions';

interface IState {
    cards: MemoryCard[];
}

interface Action {
    type: CARD_ACTION | DEFAULT_ACTION;
    card?: MemoryCard;
    cardId?: number;
    payload?: MemoryCard[];
}

export interface CardAction {
    type: CARD_ACTION;
    cardId: number;
}

const hasAttemptedAll = (cards: MemoryCard[]) => {
    return !!cards.find((card) => isBefore(card.nextDate, endOfToday()));
};

const cardActionReducer = (cards: MemoryCard[], { type, cardId }: CardAction) => {
    switch (type) {
        case CARD_ACTION.WRONG:
            return practise(cards, cardId);
        case CARD_ACTION.RIGHT:
            return practise(cards, cardId);
        case CARD_ACTION.PAUSE:
            return practise(cards, cardId);
        default:
            throw new Error();
    }
};

const secondAttemptReducer = (cards: MemoryCard[], { type, cardId }: CardAction) => {
    switch (type) {
        case CARD_ACTION.WRONG:
            return wrong(cards, cardId);
        case CARD_ACTION.RIGHT:
            return right(cards, cardId);
        case CARD_ACTION.PAUSE:
            return pause(cards, cardId);
        default:
            throw new Error();
    }
};

export const init = (): IState => {
    return { cards: getCards() };
};

export const reducer = (state: IState, action: Action): IState => {
    if (action.cardId) {
        const { cards } = hasAttemptedAll(state.cards)
            ? secondAttemptReducer(state.cards, action as CardAction)
            : cardActionReducer(state.cards, action as CardAction);

        return { ...state, cards };
    }

    if (action.type === CARD_ACTION.ADD) {
        return { ...state, ...addCard(state.cards) };
    }

    switch (action.type) {
        case DEFAULT_ACTION.RESET:
            return init();
    }

    return state;
};
