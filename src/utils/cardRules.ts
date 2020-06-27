import { MemoryCard } from '../store/main';
import { differenceInHours, isToday, isBefore, endOfToday } from 'date-fns';

const COOLDOWN_LENGTH = 2;

export enum ADDITIONAL_DAYS {
    WRONG = 1,
    DAY_1 = 2,
    DAY_2 = 3,
    DAY_3 = 5,
    DAY_4 = 7,
    DAY_5 = 30,
    DEFAULT = 90,
}

export enum MAX_CARDS {
    NEW = 10,
}

export const showForPractise = (card: MemoryCard): boolean => {
    if (!card.lastAttempt || card.correctCount > 0) {
        return false;
    }

    return (
        (!card.secondAttempt || !isToday(card.secondAttempt)) &&
        differenceInHours(card.lastAttempt, new Date()) > COOLDOWN_LENGTH
    );
};

export const showToday = (card: MemoryCard): boolean =>
    isBefore(card.nextDate, endOfToday()) && (!card.isPaused || !isToday(card.isPaused));
