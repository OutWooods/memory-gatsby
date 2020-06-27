// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let localStorage: any;

export interface MemoryCard {
    id: number;
    correctCount: number;
    incorrectCount: number;
    nextDate: Date;
    isPaused: Date | undefined;
    secondAttempt: Date | undefined;
    lastAttempt: Date | undefined;
}
const mockState: MemoryCard[] = [
    {
        id: 1,
        correctCount: 1,
        incorrectCount: 0,
        nextDate: new Date(),
        isPaused: undefined,
        secondAttempt: undefined,
        lastAttempt: new Date(),
    },
    {
        id: 2,
        correctCount: 0,
        incorrectCount: 0,
        nextDate: new Date(),
        isPaused: undefined,
        secondAttempt: undefined,
        lastAttempt: new Date(),
    },
    {
        id: 3,
        correctCount: 0,
        incorrectCount: 0,
        nextDate: new Date(),
        isPaused: undefined,
        secondAttempt: undefined,
        lastAttempt: new Date(),
    },
    {
        id: 4,
        correctCount: 0,
        incorrectCount: 0,
        nextDate: new Date(),
        isPaused: undefined,
        secondAttempt: undefined,
        lastAttempt: new Date(),
    },
];

export const getCards = (): MemoryCard[] => {
    const memoryCards = localStorage.getItem('memory-cards');
    if (memoryCards) {
        return JSON.parse(memoryCards).map((card: MemoryCard) => {
            card.nextDate = new Date(card.nextDate);
            card.isPaused = card.isPaused ? new Date(card.isPaused) : undefined;
            card.secondAttempt = card.secondAttempt ? new Date(card.secondAttempt) : undefined;
            card.lastAttempt = card.lastAttempt ? new Date(card.lastAttempt) : undefined;
            return card;
        });
    }

    return mockState;
};

export const setCards = (memoryCards: MemoryCard[]): void =>
    localStorage.setItem('memory-cards', JSON.stringify(memoryCards));
