/** @jsx h */

import h from '../h';

const options = {
    preserveKeys: true
};

const input = (
    <value>
        <document>
            <block type="image" isVoid data={{ 0: 'foo' }} />
        </document>
    </value>
);

const output = `
<value>
    <document key="5">
        <block type="image" isVoid data={{ 0: 'foo' }} />
    </document>
</value>
`;

export { input, output, options };
