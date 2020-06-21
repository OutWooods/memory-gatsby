import React from 'react';
import { PageProps } from 'gatsby';
import Layout from '../components/layout';

export const P: React.FunctionComponent<PageProps> = () => (
    <Layout>
        <div style={{ color: `teal` }}>
            <p>Such wow. Very React.</p>
        </div>
    </Layout>
);
