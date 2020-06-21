import React, { useState } from 'react';
import Layout from '../components/layout';

const IndexPage = (): JSX.Element => {
    const [count, setCount] = useState(0);

    return (
        <Layout>
            <h1 className="text-blue-200">Hello</h1>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click</button>
        </Layout>
    );
};

export default IndexPage;
