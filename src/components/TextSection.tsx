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
            <div className="pl-1 flex flex-col w-24 items-center">
                <span className="text-center" key={position + content}>
                    {content + ' '}
                </span>
                <div>
                    <button>right</button> <button>wrong</button>
                </div>
            </div>
        ) : (
            <div className="pl-1 flex flex-col w-24 text-white">
                <button
                    key={position + content}
                    className="w-full text-white border-solid border-4 border-gray-600 pl-1"
                    onClick={this.changeStatus}
                >
                    {content + ' '}
                </button>
                <div>
                    <span>right</span> <span>wrong</span>
                </div>
            </div>
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
                <span className="pl-1" key={position + content}>
                    {content + ' '}
                </span>
            );
        });
    };
    const display = sections.map((section, index) => (
        <div className="flex" key={index}>
            {sectionText(section)}
        </div>
    ));

    return (
        <div>
            <div>{display}</div>
        </div>
    );
}
