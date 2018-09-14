/** @jsx h */

import h from '../../../h';

const input = (
    <value>
        <document>
            <paragraph>
                Hello, world!
            </paragraph>
        </document>
    </value>
);

const output = `
<value>
    <document>
        <paragraph>Hello, world!</paragraph>
    </document>
</value>
`;

export { input, output };
