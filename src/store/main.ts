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
        const storedCards = JSON.parse(memoryCards).map((card: MemoryCard) => {
            card.nextDate = new Date(card.nextDate);
            card.isPaused = card.isPaused ? new Date(card.isPaused) : undefined;
            card.secondAttempt = card.secondAttempt ? new Date(card.secondAttempt) : undefined;
            card.lastAttempt = card.lastAttempt ? new Date(card.lastAttempt) : undefined;
            return card;
        });
        console.log(storedCards[0].nextDate);
        console.log(storedCards[0].correctCount);
        let lastCard = 0;
        const newCards = storedCards.filter((card: MemoryCard) => {
            if (lastCard === card.id) {
                return false;
            }
            lastCard = card.id;
            return true;
        });
        return newCards;
    }

    return defaultData();
};

export const setCards = (memoryCards: MemoryCard[]): void =>
    localStorageHolder ? localStorageHolder.setItem('memory-cards', JSON.stringify(memoryCards)) : undefined;
