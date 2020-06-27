import { MemoryCard } from '../store/main';
import { startOfTomorrow, addDays } from 'date-fns';
import { ADDITIONAL_DAYS } from './cardRules';

export interface CardsUpdate {
    cards: MemoryCard[];
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
    card.isPaused = undefined;
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
    card.isPaused = undefined;
    card.lastAttempt = new Date();
    card.nextDate = addDays(new Date(), getDaysToAdd(card.correctCount));
    return { cards: cards };
};

export const pause = (cards: MemoryCard[], id: number): CardsUpdate => {
    const card = cards.find((card) => card.id === id);
    if (!card) {
        throw new Error();
    }

    card.isPaused = new Date();
    return { cards: cards };
};

export const practise = (cards: MemoryCard[], id: number): CardsUpdate => {
    const card = cards.find((card) => card.id === id);
    if (!card) {
        throw new Error();
    }

    card.secondAttempt = new Date();
    return { cards: cards };
};

export const addCard = (cards: MemoryCard[]): CardsUpdate => {
    cards.push({
        id: cards.length,
        correctCount: 0,
        incorrectCount: 0,
        nextDate: startOfTomorrow(),
        isPaused: undefined,
        secondAttempt: undefined,
        lastAttempt: undefined,
    });

    return { cards: cards };
};
