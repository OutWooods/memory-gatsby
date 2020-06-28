import defaultData from './defaultData';

const localStorageHolder = typeof localStorage !== 'undefined' && localStorage;

export interface MemoryCard {
    id: number;
    correctCount: number;
    incorrectCount: number;
    nextDate: Date;
    isPaused: Date | undefined;
    secondAttempt: Date | undefined;
    lastAttempt: Date | undefined;
}

export const getCards = (): MemoryCard[] => {
    if (!localStorageHolder) {
        return defaultData();
    }

    const memoryCards = localStorageHolder.getItem('memory-cards');
    if (memoryCards) {
        return JSON.parse(memoryCards).map((card: MemoryCard) => {
            card.nextDate = new Date(card.nextDate);
            card.isPaused = card.isPaused ? new Date(card.isPaused) : undefined;
            card.secondAttempt = card.secondAttempt ? new Date(card.secondAttempt) : undefined;
            card.lastAttempt = card.lastAttempt ? new Date(card.lastAttempt) : undefined;
            return card;
        });
    }

    return defaultData();
};

export const setCards = (memoryCards: MemoryCard[]): void =>
    localStorageHolder ? localStorageHolder.setItem('memory-cards', JSON.stringify(memoryCards)) : undefined;
