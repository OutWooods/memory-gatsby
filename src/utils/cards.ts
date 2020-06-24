import { MemoryCard } from '../store/main';
import { startOfTomorrow, addDays } from 'date-fns';

export interface CardsUpdate {
    cards: MemoryCard[];
}

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

export const wrong = (cards: MemoryCard[], id: number): CardsUpdate => {
    const card = cards.find((card) => card.id === id);
    if (!card) {
        throw new Error();
    }

    card.incorrectCount += 1;
    card.correctCount = 0;
    card.isPaused = false;
    card.nextDate = startOfTomorrow();
    card.lastAttempt = new Date();
    return { cards: cards };
};

export const right = (cards: MemoryCard[], id: number): CardsUpdate => {
    const card = cards.find((card) => card.id === id);
    if (!card) {
        throw new Error();
    }

    card.correctCount += 1;
    card.incorrectCount = 0;
    card.isPaused = false;
    card.lastAttempt = new Date();
    card.nextDate = addDays(new Date(), getDaysToAdd(card.correctCount));
    return { cards: cards };
};

export const pause = (cards: MemoryCard[], id: number): CardsUpdate => {
    const card = cards.find((card) => card.id === id);
    if (!card) {
        throw new Error();
    }

    card.isPaused = true;
    return { cards: cards };
};

export const practise = (cards: MemoryCard[], id: number): CardsUpdate => {
    const card = cards.find((card) => card.id === id);
    if (!card) {
        throw new Error();
    }

    card.secondAttempt = true;
    return { cards: cards };
};
