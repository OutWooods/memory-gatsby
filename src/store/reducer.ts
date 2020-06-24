import { MemoryCard } from './main';
import { wrong, right, pause, practise } from '../utils/cards';
import { isFuture } from 'date-fns';

interface IState {
    cards: MemoryCard[];
}

interface Action {
    type: string;
    card?: MemoryCard;
    cardId?: number;
    payload?: MemoryCard[];
}

export interface CardAction {
    type: 'WRONG' | 'RIGHT' | 'PAUSE';
    cardId: number;
}

const hasAttemptedAll = (cards: MemoryCard[]) => {
    return !!cards.find((card) => !isFuture(card.nextDate));
};

const cardActionReducer = (cards: MemoryCard[], { type, cardId }: CardAction) => {
    switch (type) {
        case 'WRONG':
            return practise(cards, cardId);
        case 'RIGHT':
            return practise(cards, cardId);
        case 'PAUSE':
            return practise(cards, cardId);
        default:
            throw new Error();
    }
};

const secondAttemptReducer = (cards: MemoryCard[], { type, cardId }: CardAction) => {
    switch (type) {
        case 'WRONG':
            return wrong(cards, cardId);
        case 'RIGHT':
            return right(cards, cardId);
        case 'PAUSE':
            return pause(cards, cardId);
        default:
            throw new Error();
    }
};

export const init = (initialCards: MemoryCard[]): IState => {
    return { cards: initialCards };
};

export const reducer = (state: IState, action: Action): IState => {
    if (action.cardId) {
        return hasAttemptedAll(state.cards)
            ? secondAttemptReducer(state.cards, action as CardAction)
            : cardActionReducer(state.cards, action as CardAction);
    }

    if (action.payload) {
        switch (action.type) {
            case 'reset':
                return init(action.payload);
        }
    }

    return state;
};
