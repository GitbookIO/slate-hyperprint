/** @jsx h */

import h from '../h';

const input = (
    <value>
        <document data={{ key: 'value' }}>
            <paragraph>Hello</paragraph>
        </document>
    </value>
);

const output = `
<value>
    <document data={{ key: 'value' }}>
        <paragraph>Hello</paragraph>
    </document>
</value>
`;

export { input, output };
