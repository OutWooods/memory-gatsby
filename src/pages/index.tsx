import React, { useReducer, useEffect } from 'react';
import Layout from '../components/layout';
import { setText, setInfo } from '../store/main';
import { reducer, init } from '../store/reducer';

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
        return (
            <Layout>
                <p>Does this look OK?</p>
                <button onClick={() => dispatch({ type: 'UPLOAD' })}>Upload</button>
                <button onClick={() => dispatch({ type: 'CANCEL_UPLOAD' })}>Cancel</button>
            </Layout>
        );
    }

    return (
        <Layout>
            <p>Uploaded!</p>
        </Layout>
    );
};

export default IndexPage;
