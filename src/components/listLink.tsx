import React from 'react';
import { Link } from 'gatsby';

export interface ListLink {
    to: string;
    children: string;
}

const ListLink = (props: ListLink): JSX.Element => (
    <li style={{ display: `inline-block`, marginRight: `1rem` }}>
        <Link to={props.to}>{props.children}</Link>
    </li>
);

export default ListLink;
