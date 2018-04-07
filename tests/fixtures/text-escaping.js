/** @jsx h */

import h from '../h';

const space = ' ';

const input = (
    <value>
        <document>
            <paragraph>Should not escape simple text.</paragraph>
            <paragraph>{"Should escape ' properly"}</paragraph>
            <paragraph>{'Should escape <, >, {, } properly'}</paragraph>
            <paragraph>{"Should escape \\'"}</paragraph>
            <paragraph>{space}</paragraph>
            <paragraph should={'{"escape attributes"}'} />
        </document>
    </value>
);

const output = `
<value>
    <document>
        <paragraph>Should not escape simple text.</paragraph>
        <paragraph>{"Should escape ' properly"}</paragraph>
        <paragraph>{'Should escape <, >, {, } properly'}</paragraph>
        <paragraph>{"Should escape \\'"}</paragraph>
        <paragraph> </paragraph>
    </document>
</value>
`;

export { input, output };
