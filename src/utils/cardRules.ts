import { MemoryCard } from '../store/main';
import {
    differenceInHours,
    isToday,
    isBefore,
    endOfToday,
    addDays,
    startOfToday,
    startOfWeek,
    startOfTomorrow,
} from 'date-fns';

const COOLDOWN_LENGTH = 2;

interface LooseObject {
    [key: string]: () => Date;
}

export const ADDITIONAL_DAYS: LooseObject = {
    WRONG: (): Date => startOfTomorrow(),
    ['1']: (): Date => addDays(startOfToday(), 2),
    ['2']: (): Date => addDays(startOfWeek(new Date()), 7),
    ['3']: (): Date => addDays(startOfWeek(new Date()), 28),
    ['4']: (): Date => addDays(startOfWeek(new Date()), 84),
    DEFAULT: (): Date => addDays(startOfWeek(new Date()), 84),
};

export enum MAX_CARDS {
    NEW = 10,
    TOTAL = 10,
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
