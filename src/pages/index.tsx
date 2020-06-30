import React, { useReducer, useEffect } from 'react';
import Layout from '../components/layout';
import { Text, upload, getText, setText } from '../store/main';
import { reducer, TextAction, init } from '../store/reducer';

const IndexPage = (): JSX.Element => {
    const [{ text }, dispatch] = useReducer(reducer, {}, init);
    // TODO find a more performant way to do this
    useEffect(() => setText(text));

    if (text.length === 0) {
        return (
            <Layout>
                <p>You need to upload a text</p>
                <textarea></textarea>
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
