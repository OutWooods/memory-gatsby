// import { MemoryCard } from './main';
import { addDays } from 'date-fns';
import { MemoryCard } from './main';

const addCard = (id: number, daysToAdd: number, correctCount: number): MemoryCard => ({
    id: id,
    correctCount: correctCount,
    incorrectCount: 0,
    nextDate: addDays(new Date(), daysToAdd),
    isPaused: undefined,
    secondAttempt: undefined,
    lastAttempt: new Date(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultData = (): any => {
    const firstPart1 = Array.from(Array(5).keys()).map((value) => value + 1);
    const firstPart2 = Array.from(Array(6).keys()).map((value) => value + 7);
    const firstPart3 = Array.from(Array(5).keys()).map((value) => value + 15);
    const firstPart4 = [21, 22, 25, 28, 29, 30, 33, 34, 35, 36];
    const firstPart5 = Array.from(Array(9).keys()).map((value) => value + 38);
    const firstPart6 = [50, 51, 52, 55, 57, 59, 60, 61, 65];

    const secondPart1 = [6, 13, 14, 23, 24, 26, 27, 31, 32, 36, 37, 47, 48, 49, 53, 54, 56, 58, 62, 63, 64];
    const secondPart2 = Array.from(Array(15).keys()).map((value) => value + 66);
    const secondPart3 = [81, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 96, 113, 114, 116, 117];

    const thirdPart1 = [20, 82, 88, 94, 95, 97, 98, 99, 100, 101, 102, 103, 104, 106, 107, 108, 109, 110, 111];
    const thirdPart2 = [115, 118, 119, 120, 122, 123, 124, 125, 126, 129, 130];

    const first = [
        ...firstPart1,
        ...firstPart2,
        ...firstPart3,
        ...firstPart4,
        ...firstPart5,
        ...firstPart6,
    ].map((card) => addCard(card, 36, 4));
    const second = [...secondPart1, ...secondPart2, ...secondPart3].map((card) => addCard(card, 8, 3));
    const third = [...thirdPart1, ...thirdPart2].map((card) => addCard(card, 1, 2));
    const fourth = [105, 127, 132].map((card) => addCard(card, 1, 1));
    const fifth = [121, 131, 128, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 112].map((card) =>
        addCard(card, 0, 0),
    );
    const all = [...first, ...second, ...third, ...fourth, ...fifth].sort((first, second) =>
        first.id > second.id ? 1 : -1,
    );

    return all;
};

export default defaultData;
