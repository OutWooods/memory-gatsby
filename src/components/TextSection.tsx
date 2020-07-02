import React, { Component } from 'react';
import { Text } from '../store/main';

interface Props {
    text: Text;
}

interface WordProps {
    text: textSection;
}

interface WordState {
    isShowing: boolean;
}

interface LooseObject {
    [key: string]: number;
}

interface textSection {
    content: string;
    isHidden: boolean;
    position: number;
}

const LEVELS: LooseObject = {
    1: 0.2,
    2: 0.4,
    3: 0.6,
    4: 0.8,
    5: 1,
    DEFAULT: 1,
};

// events - get one wrong, or get them all right
export class Word extends Component<WordProps, WordState> {
    state: WordState = {
        isShowing: false,
    };

    changeStatus = (): void => {
        this.setState({
            isShowing: true,
        });
    };

    render(): JSX.Element {
        const { position, content } = this.props.text;

        return this.state.isShowing ? (
            <span key={position + content}>{content + ' '}</span>
        ) : (
            <button
                key={position + content}
                className={'text-white border-solid border-4 border-gray-600'}
                onClick={this.changeStatus}
            >
                {content + ' '}
            </button>
        );
    }
}

export default function TextSection({ text }: Props): JSX.Element {
    const level = LEVELS[text.level];

    const sections: Array<textSection[]> = text.content.split('\n').map((section) => {
        const newSection: textSection[] = section.split(/\s/g).map((content, index) => ({
            position: index,
            content: content,
            isHidden: false,
        }));

        const numberToGet = Math.floor(newSection.length * level) + 1;
        const allIndexes = [...Array(newSection.length).keys()];
        for (let i = 0; i < numberToGet; i += 1) {
            const position = Math.floor(Math.random() * allIndexes.length);
            newSection[position].isHidden = true;
            allIndexes.splice(allIndexes.indexOf(position), 1);
        }

        return newSection;
    });

    const sectionText = (section: textSection[]) => {
        return section.map(({ position, isHidden, content }) => {
            return isHidden ? (
                <Word key={position + content} text={{ position, content, isHidden }} />
            ) : (
                <span key={position + content}>{content + ' '}</span>
            );
        });
    };
    const display = sections.map((section, index) => <p key={index}>{sectionText(section)}</p>);

    return (
        <div>
            <div>{display}</div>
        </div>
    );
}
