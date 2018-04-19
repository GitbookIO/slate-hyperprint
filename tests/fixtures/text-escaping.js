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
            <paragraph
                should={{ escape: {}, object: ['etc.'], always: new Date(0) }}
            />
            <paragraph>
                <bold>{"Should escape'em \n\nline breaks."}</bold>
                {'\n'}
            </paragraph>
        </document>
    </value>
);

const output = `
<value>
    <document>
        <paragraph>Should not escape simple text.</paragraph>
        <paragraph>{"Should escape ' properly"}</paragraph>
        <paragraph>{'Should escape <, >, {, } properly'}</paragraph>
        <paragraph>{"Should escape \\\\'"}</paragraph>
        <paragraph> </paragraph>
        <paragraph should="{&quot;escape attributes&quot;}" />
        <paragraph
            should={{
                always: new Date('1970-01-01T00:00:00.000Z'),
                escape: {},
                object: ['etc.']
            }}
        />
        <paragraph>
            <bold>{"Should escape'em \\n\\nline breaks."}</bold>
            {'\\n'}
        </paragraph>
    </document>
</value>
`;

export { input, output };
