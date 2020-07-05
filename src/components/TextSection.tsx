import React, { Component } from 'react';
import { Text } from '../store/main';
import { splitSections } from '../utils/tidySections';
import { Word } from './Word';

interface Props {
    text: Text;
    completeSection: (isRight: boolean) => void;
    wrongWord: (letterPlace: number) => void;
    rightWord: (letterPlace: number) => void;
}

interface State {
    sections: Section[][];
    isRight: boolean;
}

export interface Section {
    content: string;
    isHidden: boolean;
    position: number;
    isTesting: boolean;
    isRight?: boolean;
}

const sectionText = (
    section: Section[],
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

export default class TextSectionComponent extends Component<Props, State> {
    state = {
        sections: splitSections(this.props.text),
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
