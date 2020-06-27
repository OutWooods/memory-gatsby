import { MemoryCard, getCards } from './main';
import { wrong, right, pause, practise, addCard } from '../utils/cards';
import { isFuture } from 'date-fns';
import { WRONG_VISIBILITY, CARD_ACTION, DEFAULT_ACTION } from './actions';

interface IState {
    cards: MemoryCard[];
    showWrong: boolean;
}

interface Action {
    type: CARD_ACTION | WRONG_VISIBILITY | DEFAULT_ACTION;
    card?: MemoryCard;
    cardId?: number;
    payload?: MemoryCard[];
}

export interface CardAction {
    type: CARD_ACTION;
    cardId: number;
}

const hasAttemptedAll = (cards: MemoryCard[]) => {
    return !!cards.find((card) => !isFuture(card.nextDate));
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

const showWrongReducer = (type: string) => ({ showWrong: type === WRONG_VISIBILITY.SHOW });

export const init = (): IState => {
    return { cards: getCards(), showWrong: false };
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

    if (action.type === WRONG_VISIBILITY.SHOW || action.type == WRONG_VISIBILITY.HIDE) {
        return { ...state, ...showWrongReducer(action.type) };
    }

    switch (action.type) {
        case DEFAULT_ACTION.RESET:
            return init();
    }

    return state;
};
