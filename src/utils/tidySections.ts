import { Section } from '../components/TextSection';
import { ProblemWord } from '../store/main';

export interface LooseObject {
    [key: string]: number;
}

interface SplitSectionsData {
    content: string;
    problemWords: ProblemWord[];
}

const LEVELS: LooseObject = {
    1: 0.2,
    2: 0.4,
    3: 0.6,
    4: 0.8,
    5: 1,
    DEFAULT: 1,
};

export const splitSections = ({ content, problemWords }: SplitSectionsData): Section[][] => {
    const calculatedLevel = 1;
    if (calculatedLevel >= 5) {
        return content.split('\n').map((section) => {
            return section.split(/\s/g).map((content, index: number) => ({
                position: index,
                content: content,
                isTesting: true,
                isHidden: true,
            }));
        });
    }

    return content.split('\n').map((section) => {
        const newSection: Section[] = section.split(/\s/g).map((content, index) => ({
            position: index,
            content: content,
            isTesting: false,
            isHidden: false,
        }));

        const numberToGet = Math.floor(newSection.length * calculatedLevel) + 1;
        const allIndexes = [...Array(newSection.length).keys()];

        const priortityWords = problemWords.map((problemWord) => problemWord.position);

        for (let i = 0; i < numberToGet; i += 1) {
            let position;
            if (i < priortityWords.length) {
                position = priortityWords[i];
            } else {
                position = Math.floor(Math.random() * allIndexes.length);
            }
            newSection[position].isHidden = true;
            newSection[position].isTesting = true;
            allIndexes.splice(allIndexes.indexOf(position), 1);
        }

        return newSection;
    });
};
