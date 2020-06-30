import React, { useReducer, useEffect } from 'react';
import Layout from '../components/layout';
import { setText } from '../store/main';
import { reducer, init } from '../store/reducer';

const IndexPage = (): JSX.Element => {
    const [{ text, uploadText }, dispatch] = useReducer(reducer, {}, init);
    // TODO find a more performant way to do this
    console.log(text);
    useEffect(() => {
        if (!uploadText) {
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
                <button onClick={() => dispatch({ type: 'UPLOAD' })}>Upload</button>
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
