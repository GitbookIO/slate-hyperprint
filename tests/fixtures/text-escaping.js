/** @jsx h */

import h from '../h';

const input = (
    <value>
        <document>
            <paragraph>Should not escape simple text.</paragraph>
            <paragraph>{"Should escape ' properly"}</paragraph>
            <paragraph>{'Should escape <, >, {, } properly'}</paragraph>
        </document>
    </value>
);

const output = `
<value>
    <document>
        <paragraph>
            Should not escape simple text.
        </paragraph>
        <paragraph>
            {'Should escape \\' properly'}
        </paragraph>
        <paragraph>
            {'Should escape <, >, {, } properly'}
        </paragraph>
    </document>
</value>
`;

export { input, output };
