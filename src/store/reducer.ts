import { MemoryCard } from './main';
import { wrong, right, pause } from '../utils/cards';

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
    type: string;
    cardId: number;
}

const cardActionReducer = (cards: MemoryCard[], { type, cardId }: CardAction) => {
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
        return cardActionReducer(state.cards, action as CardAction);
    }

    if (action.payload) {
        switch (action.type) {
            case 'reset':
                return init(action.payload);
        }
    }

    return state;
};
