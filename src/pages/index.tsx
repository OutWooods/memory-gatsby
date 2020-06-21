import React, { useState } from 'react';
import { PageProps } from 'gatsby';
import Layout from '../components/layout';

export const IndexRoute: React.FunctionComponent<PageProps> = () => {
    const [count, setCount] = useState(0);

    return (
        <Layout>
            <h1 className="text-blue-200">Hello</h1>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click</button>
        </Layout>
    );
};
