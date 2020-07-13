import { MemoryCard } from '../store/main';
import { startOfTomorrow } from 'date-fns';
import { ADDITIONAL_DAYS } from './cardRules';

export interface CardsUpdate {
    cards: MemoryCard[];
}

const daysToAdd = (count: number): Date => {
    const additionalDays = ADDITIONAL_DAYS[count + ''];

    return additionalDays ? additionalDays() : ADDITIONAL_DAYS.DEFAULT();
};

const updateCard = (card: MemoryCard, correct: boolean, nextDate: Date) => {
    const newCard = { ...card };

    if (correct) {
        newCard.incorrectCount = 0;
        newCard.correctCount += 1;
    } else {
        newCard.incorrectCount += 1;
        newCard.correctCount = 0;
    }

    newCard.nextDate = nextDate;
    newCard.isPaused = undefined;
    newCard.lastAttempt = new Date();

    return newCard;
};

export const wrong = (cards: MemoryCard[], id: number): MemoryCard[] => {
    const card = cards.find((card) => card.id === id);
    const index = cards.findIndex((card) => card.id === id);
    if (!card || !index) {
        throw new Error();
    }

    const newCards = [...cards];
    newCards[index] = updateCard(card, false, ADDITIONAL_DAYS.WRONG());

    return newCards;
};

export const right = (cards: MemoryCard[], id: number): MemoryCard[] => {
    const card = cards.find((card) => card.id === id);
    const index = cards.findIndex((card) => card.id === id);
    if (!card || !index) {
        throw new Error();
    }

    const newCards = [...cards];
    newCards[index] = updateCard(card, true, daysToAdd(card.correctCount));
    return newCards;
};

export const pause = (cards: MemoryCard[], id: number): MemoryCard[] => {
    const card = cards.find((card) => card.id === id);
    const index = cards.findIndex((card) => card.id === id);
    if (!card || !index) {
        throw new Error();
    }

    const newCards = [...cards];
    const newCard = { ...card };
    newCard.isPaused = new Date();
    newCards[index] = newCard;

    return newCards;
};

export const practise = (cards: MemoryCard[], id: number): MemoryCard[] => {
    const card = cards.find((card) => card.id === id);
    const index = cards.findIndex((card) => card.id === id);
    if (!card || !index) {
        throw new Error();
    }

    const newCards = [...cards];
    const newCard = { ...card };
    newCard.secondAttempt = new Date();
    newCard.nextDate = new Date();
    newCards[index] = newCard;

    return newCards;
};

export const addCard = (cards: MemoryCard[]): MemoryCard[] => {
    const newCard = {
        id: cards.length + 1,
        correctCount: 0,
        incorrectCount: 0,
        nextDate: startOfTomorrow(),
        isPaused: undefined,
        secondAttempt: undefined,
        lastAttempt: undefined,
    };

    return [...cards, newCard];
};