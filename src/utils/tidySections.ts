import { Section } from '../components/TextSection';
import { ProblemWord } from '../store/main';
import { sampleSize, partition } from 'lodash';

export interface LooseObject {
    [key: string]: number;
}

interface SplitSectionsData {
    content: string;
    problemWords: ProblemWord[];
    level: number;
}

const LEVELS: LooseObject = {
    1: 0.2,
    2: 0.4,
    3: 0.6,
    4: 0.8,
    5: 1,
    DEFAULT: 1,
};

export const splitSections = ({ content, level, problemWords }: SplitSectionsData): Section[][] => {
    const calculatedLevel = LEVELS[level] || LEVELS.DEFAULT;

    return content.split('\n').map((section) => {
        const words = section.split(/\s/g);
        const allIndexes = [...Array(words.length).keys()];
        const problemIds = problemWords.map(({ position }) => position);
        const numberToGet = Math.max(Math.floor(allIndexes.length * calculatedLevel), 1);
        const [hide, remaining] = partition(allIndexes, (position) => problemIds.includes(position));

        const hiddenIds = [
            ...sampleSize(hide, numberToGet),
            ...sampleSize(remaining, Math.max(numberToGet - problemIds.length, 0)),
        ];

        const newSection: Section[] = words.map((content, index) => {
            const section = {
                position: index,
                content: content,
                isTesting: false,
                isHidden: false,
            };
            if (hiddenIds.includes(index)) {
                section.isTesting = true;
                section.isHidden = true;
            }
            return section;
        });

        return newSection;
    });
};
