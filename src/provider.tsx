import React, { useState } from 'react';

export interface ExampleProps {
    examples: number[],
}

export const WithExampleContext = React.createContext<ExampleProps>({
    examples: [],
});

const ExampleContext = ({ children }: { children: JSX.Element }) => {
    const [examples] = useState([1]);

    const value = { examples };

    return <WithExampleContext.Provider value={value}>{children}</WithExampleContext.Provider>;
};

// eslint-disable-next-line react/display-name
export default ({ element }: { element: JSX.Element }): JSX.Element => <ExampleContext>{element}</ExampleContext>;
