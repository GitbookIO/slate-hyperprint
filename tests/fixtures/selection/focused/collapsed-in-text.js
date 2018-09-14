/** @jsx h */

import h from '../../../h';

const input = (
    <value>
        <document>
            <paragraph />
            <paragraph>
                Hel<cursor />lo, world!
            </paragraph>
        </document>
    </value>
);

const output = `
<value>
    <document>
        <paragraph />
        <paragraph>
            Hel<cursor />lo, world!
        </paragraph>
    </document>
</value>
`;

export { input, output };
