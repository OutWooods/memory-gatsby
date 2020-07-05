import { Section } from '../components/TextSection';
import { ProblemWord } from '../store/main';
import { sampleSize, partition, shuffle } from 'lodash';

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

        const newSection: Section[] = words.map((content, index) => ({
            position: index,
            content: content,
            isTesting: false,
            isHidden: false,
        }));

        const numberToGet = Math.max(Math.floor(newSection.length * calculatedLevel), 1) - problemWords.length;
        let hidden = [];
        if (problemWords.length > 0) {
            const problemIds = problemWords.map(({ position }) => position);
            const [hide, remaining] = partition(newSection, (section) => problemIds.includes(section.position));
            if (numberToGet > 0) {
                const newHidden = sampleSize(remaining, numberToGet);
                hidden = [...hide, ...newHidden];
            } else if (numberToGet < 0) {
                hidden = sampleSize(hide, problemWords.length + numberToGet);
            } else {
                hidden = [...hide];
            }
        } else {
            hidden = sampleSize(newSection, numberToGet);
        }

        hidden.forEach((section) => {
            section.isHidden = true;
            section.isTesting = true;
        });

        return newSection;
    });
};
