/** @jsx h */

import h from '../../../h';

const input = (
    <value>
        <document>
            <paragraph />
            <paragraph>
                Hello, world!
            </paragraph>
        </document>
        <selection focused>
            <anchor path={[0, 0]} />
            <focus offset={1} path={[1, 0]} />
        </selection>
    </value>
);

const output = `
<value>
    <document>
        <paragraph>
            <anchor />
        </paragraph>
        <paragraph>
            H<focus />ello, world!
        </paragraph>
    </document>
</value>
`;

export { input, output };
