import React, { useReducer, useEffect } from 'react';
import Layout from '../components/layout';
import { setText, setInfo } from '../store/main';
import { reducer, init } from '../store/reducer';
import TextSection from '../components/TextSection';
import { differenceInMinutes, formatDuration } from 'date-fns';

const IndexPage = (): JSX.Element => {
    const [{ text, textInfo }, dispatch] = useReducer(reducer, {}, init);
    // TODO find a more performant way to do this
    useEffect(() => {
        setInfo(textInfo);
        if (textInfo.uploadDate) {
            setText(text);
        }
    });

    if (text.length === 0) {
        return (
            <Layout>
                <p>You need to upload a text</p>
                <textarea
                    onChange={(event) => dispatch({ type: 'NEW_TEXT', uploadText: event.target.value })}
                ></textarea>
                <button onClick={() => dispatch({ type: 'FORMAT_TEXT' })}>Upload</button>
            </Layout>
        );
    }

    if (!textInfo.uploadDate) {
        const formattedText = text.map(({ content }) => content).join('\n');
        return (
            <Layout>
                <p className="text-xl pb-4">Does this look OK?</p>
                <p className="whitespace-pre-line pb-4">{formattedText}</p>
                <button className="pr-4" onClick={() => dispatch({ type: 'UPLOAD' })}>
                    Upload
                </button>
                <button onClick={() => dispatch({ type: 'CANCEL_UPLOAD' })}>Cancel</button>
            </Layout>
        );
    }

    const timeSinceLast = textInfo.lastAttempt ? differenceInMinutes(new Date(), textInfo.lastAttempt) : 100;
    if (timeSinceLast < 60 && timeSinceLast >= 0) {
        return (
            <Layout>
                <div> Come back again in {formatDuration({ minutes: 60 - timeSinceLast })}</div>
            </Layout>
        );
    }

    const wrongWord = (position: number, letterPlace: number) => {
        dispatch({ type: 'WRONG_WORD', position, letterPlace });
    };
    const rightWord = (position: number, letterPlace: number) => {
        dispatch({ type: 'RIGHT_WORD', position, letterPlace });
    };
    const completeSection = (position: number, isRight: boolean) => {
        dispatch({ type: 'COMPLETE_ROUND', position, isRight });
    };
    const showText = text.filter((part) => part.level >= 3);
    const allTextToShow = showText.length === text.length ? showText : [...showText, text[showText.length]];
    const formattedText = allTextToShow.map((text) => (
        <TextSection
            text={text}
            key={text.position}
            completeSection={(isRight: boolean) => completeSection(text.position, isRight)}
            wrongWord={(letterPlace: number) => wrongWord(text.position, letterPlace)}
            rightWord={(letterPlace: number) => rightWord(text.position, letterPlace)}
        />
    ));

    return (
        <Layout>
            <div>{formattedText}</div>
        </Layout>
    );
};

export default IndexPage;
