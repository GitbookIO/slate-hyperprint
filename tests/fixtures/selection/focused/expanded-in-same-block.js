/** @jsx h */

import h from '../../../h';

const input = (
    <value>
        <document>
            <paragraph />
            <paragraph>
                H<anchor />ello, <focus />world!
            </paragraph>
        </document>
    </value>
);

const output = `
<value>
    <document>
        <paragraph />
        <paragraph>
            H<anchor />ello, <focus />world!
        </paragraph>
    </document>
</value>
`;

export { input, output };
