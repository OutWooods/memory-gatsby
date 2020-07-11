import React from 'react';
import Layout from '../components/layout';
import Question from '../components/question';

const IndexPage = (): JSX.Element => {
    const makeQuestion = () => ({
        question: Math.random(),
        answer: Math.random(),
        showAnswer: false,
    });

    return (
        <Layout>
            <Question questionIdentifier="A1" generateQuestion={makeQuestion}></Question>
            <Question questionIdentifier="A2" generateQuestion={makeQuestion}></Question>
            <Question questionIdentifier="B1" generateQuestion={makeQuestion}></Question>
        </Layout>
    );
};

export default IndexPage;
