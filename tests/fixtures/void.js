/** @jsx h */

import h from '../h';

const input = (
    <value>
        <document>
            <block type="embed" isVoid />
        </document>
    </value>
);

const output = `
<value>
    <document>
        <embed />
    </document>
</value>
`;

export { input, output };
