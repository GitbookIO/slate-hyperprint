/** @jsx h */

import h from '../../../h';

const input = (
    <value>
        <document>
            <paragraph />
            <paragraph>
                H<anchor /><focus />ello, world!
            </paragraph>
        </document>
    </value>
);

const output = `
<value>
    <document>
        <paragraph />
        <paragraph>
            H<cursor />ello, world!
        </paragraph>
    </document>
</value>
`;

export { input, output };
