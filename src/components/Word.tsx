import React from 'react';
import { Section } from './TextSection';

interface WordProps {
    text: Section;
    unHide: () => void;
    correct: () => void;
    incorrect: () => void;
}

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
