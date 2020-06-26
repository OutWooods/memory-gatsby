export interface MemoryCard {
    id: number;
    correctCount: number;
    incorrectCount: number;
    nextDate: Date;
    isPaused: boolean;
    secondAttempt: Date | undefined;
    lastAttempt: Date | undefined;
}
const mockState: MemoryCard[] = [
    {
        id: 1,
        correctCount: 1,
        incorrectCount: 0,
        nextDate: new Date(),
        isPaused: false,
        secondAttempt: undefined,
        lastAttempt: new Date(),
    },
    {
        id: 2,
        correctCount: 0,
        incorrectCount: 0,
        nextDate: new Date(),
        isPaused: true,
        secondAttempt: undefined,
        lastAttempt: new Date(),
    },
    {
        id: 3,
        correctCount: 0,
        incorrectCount: 0,
        nextDate: new Date(),
        isPaused: false,
        secondAttempt: undefined,
        lastAttempt: new Date(),
    },
];

export const getCards = (): MemoryCard[] => {
    const memoryCards = localStorage.getItem('memory-cards');
    if (memoryCards) {
        return JSON.parse(memoryCards);
    }

    return mockState;
};

export const setCards = (memoryCards: MemoryCard[]): void =>
    localStorage.setItem('memory-cards', JSON.stringify(memoryCards));
