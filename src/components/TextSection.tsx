import React from 'react';
import { Text } from '../store/main';

interface Props {
    text: Text;
}

export default function TextSection({ text }: Props): JSX.Element {
    return (
        <div>
            <p>{text.content}</p>
        </div>
    );
}
