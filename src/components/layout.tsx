import React, { ReactNode } from 'react';
import { Link } from 'gatsby';
import ListLink from './listLink';

export interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
    return (
        <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
            <header style={{ marginBottom: `1.5rem` }}>
                <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
                    <h3 style={{ display: `inline` }}>Memory Cards</h3>
                </Link>
                <ul style={{ listStyle: `none`, float: `right` }}>
                    <ListLink to="/">Home</ListLink>
                </ul>
            </header>
            {children}
        </div>
    );
}
