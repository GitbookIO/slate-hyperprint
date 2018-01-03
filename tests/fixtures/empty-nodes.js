/** @jsx h */

import h from '../h';

const space = ' ';
const input = (
    <value>
        <document>
            <paragraph />
            <paragraph>{space}</paragraph>
        </document>
    </value>
);

const output = `
<value>
    <document>
        <paragraph />
        <paragraph> </paragraph>
    </document>
</value>
`;

export { input, output };
