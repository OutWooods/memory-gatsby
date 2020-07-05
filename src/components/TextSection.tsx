import React, { Component } from 'react';
import { Text, ProblemWord } from '../store/main';

interface Props {
    text: Text;
    completeSection: (isRight: boolean) => void;
    wrongWord: (letterPlace: number) => void;
    rightWord: (letterPlace: number) => void;
}

interface State {
    sections: TextSection[][];
    isRight: boolean;
}

interface WordProps {
    text: TextSection;
    unHide: () => void;
    correct: () => void;
    incorrect: () => void;
}

interface LooseObject {
    [key: string]: number;
}

interface TextSection {
    content: string;
    isHidden: boolean;
    position: number;
    isTesting: boolean;
    isRight?: boolean;
}

const LEVELS: LooseObject = {
    1: 0.2,
    2: 0.4,
    3: 0.6,
    4: 0.8,
    5: 1,
    DEFAULT: 1,
};

const sectionText = (
    section: TextSection[],
    unHide: (textIndex: number) => void,
    correct: (textIndex: number) => void,
    incorrect: (textIndex: number) => void,
) =>
    section.map((textSection) => (
        <Word
            key={textSection.position + textSection.content}
            text={textSection}
            unHide={() => unHide(textSection.position)}
            correct={() => correct(textSection.position)}
            incorrect={() => incorrect(textSection.position)}
        />
    ));

// events - get one wrong, or get them all right
export function Word({ text, unHide, correct, incorrect }: WordProps): JSX.Element {
    const { position, content, isHidden, isTesting, isRight } = text;

    const coreStyle = 'pr-1';

    if (!isTesting) {
        return <span className={`${coreStyle}`}>{content}</span>;
    }

    if (isRight !== undefined) {
        return <span className={`${coreStyle} ${isRight ? 'text-green-800' : 'text-purple-700'}`}>{content}</span>;
    }

    return isHidden ? (
        <div className="pl-1 flex flex-col w-24 text-white">
            <button className="w-full text-white border-solid border-4 border-gray-600 pl-1" onClick={unHide}>
                {content + ' '}
            </button>
            <div>
                <span>right</span> <span>wrong</span>
            </div>
        </div>
    ) : (
        <div className="pl-1 flex flex-col w-24 items-center">
            <span className="text-center" key={position + content}>
                {content + ' '}
            </span>
            <div>
                <button onClick={correct}>right</button> <button onClick={incorrect}>wrong</button>
            </div>
        </div>
    );
}

const splitSections = (content: string, level: number, problemWords: ProblemWord[]) => {
    if (level >= 5) {
        return content.split('\n').map((section) => {
            return section.split(/\s/g).map((content, index) => ({
                position: index,
                content: content,
                isTesting: true,
                isHidden: true,
            }));
        });
    }

    return content.split('\n').map((section) => {
        const newSection: TextSection[] = section.split(/\s/g).map((content, index) => ({
            position: index,
            content: content,
            isTesting: false,
            isHidden: false,
        }));

        const numberToGet = Math.floor(newSection.length * level) + 1;
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

export default class TextSectionComponent extends Component<Props, State> {
    state = {
        sections: splitSections(this.props.text.content, LEVELS[this.props.text.level], this.props.text.problemWords),
        isRight: true,
    };

    render(): JSX.Element {
        const showAnswer = (sectionIndex: number, textIndex: number) => {
            const sectionsCopy = [...this.state.sections];
            const sectionCopy = [...sectionsCopy[sectionIndex]];
            const textCopy = { ...sectionCopy[textIndex] };

            textCopy.isHidden = false;
            sectionCopy[textIndex] = textCopy;
            sectionsCopy[sectionIndex] = sectionCopy;

            this.setState({ sections: sectionsCopy });
        };

        const correct = (sectionIndex: number, textIndex: number) => {
            const sectionsCopy = [...this.state.sections];
            const sectionCopy = [...sectionsCopy[sectionIndex]];
            const textCopy = { ...sectionCopy[textIndex] };

            textCopy.isRight = true;
            sectionCopy[textIndex] = textCopy;
            sectionsCopy[sectionIndex] = sectionCopy;

            this.props.rightWord(textIndex);
            const hasFinishedSection = !sectionsCopy
                .flat()
                .find((word) => word.isTesting && word.isRight === undefined);
            if (hasFinishedSection) {
                this.props.completeSection(this.state.isRight);
            }
            this.setState({ sections: sectionsCopy });
        };

        const incorrect = (sectionIndex: number, textIndex: number) => {
            const sectionsCopy = [...this.state.sections];
            const sectionCopy = [...sectionsCopy[sectionIndex]];
            const textCopy = { ...sectionCopy[textIndex] };

            textCopy.isRight = false;
            sectionCopy[textIndex] = textCopy;
            sectionsCopy[sectionIndex] = sectionCopy;

            this.props.wrongWord(textIndex);
            const hasFinishedSection = !sectionsCopy
                .flat()
                .find((word) => word.isTesting && word.isRight === undefined);
            if (hasFinishedSection) {
                this.props.completeSection(false);
            }
            this.setState({ sections: sectionsCopy, isRight: false });
        };

        const display = this.state.sections.map((section, index) => {
            const showAnswerIndexed = (textIndex: number) => showAnswer(index, textIndex);
            const correctIndexed = (textIndex: number) => correct(index, textIndex);
            const incorrectIndexed = (textIndex: number) => incorrect(index, textIndex);
            return (
                <div className="flex" key={index}>
                    {sectionText(section, showAnswerIndexed, correctIndexed, incorrectIndexed)}
                </div>
            );
        });

        return <div>{display}</div>;
    }
}
