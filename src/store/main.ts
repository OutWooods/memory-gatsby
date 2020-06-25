export interface MemoryCard {
    id: number;
    correctCount: number;
    incorrectCount: number;
    nextDate: Date;
    isPaused: boolean;
    secondAttempt: Date | undefined;
    lastAttempt: Date | undefined;
}

export const getCards = (): MemoryCard[] => JSON.parse(localStorage.getItem('memory-cards') || '') || [];

export const setCards = (memoryCards: MemoryCard[]): void =>
    localStorage.setItem('memory-cards', JSON.stringify(memoryCards));
