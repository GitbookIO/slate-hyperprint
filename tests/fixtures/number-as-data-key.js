/** @jsx h */

import h from '../h';

const input = (
    <value>
        <document>
            <block type="image" isVoid data={{ 0: 'foo' }} />
        </document>
    </value>
);

const output = `
<value>
    <document>
        <block data={{ '0': 'foo' }} isVoid type="image" />
    </document>
</value>
`;

export { input, output };
