import React, { useState } from 'react';
export interface Props {
    generateQuestion: () => Question;
    questionIdentifier: string;
}

export interface Question {
    question: string | number;
    answer: string | number;
    showAnswer: boolean;
}

const Question = ({ generateQuestion, questionIdentifier }: Props): JSX.Element => {
    const [{ question, answer, showAnswer }, updateQuestion] = useState(generateQuestion());

    return (
        <div>
            <p>
                <span>{questionIdentifier})</span>
                <span>{question}</span>
                {showAnswer && <span>{answer}</span>}
                <button onClick={() => updateQuestion({ question, answer, showAnswer: !showAnswer })}>
                    {showAnswer ? 'hide' : 'show'}
                </button>
                <button onClick={() => updateQuestion(generateQuestion())}>Refresh</button>
            </p>
        </div>
    );
};

export default Question;
