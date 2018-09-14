/** @jsx h */

import h from '../../../h';

const input = (
    <value>
        <document>
            <paragraph>
                __@anchor@__<anchor />__@@focus@@__
            </paragraph>
            <paragraph>
                Hel<focus />lo, __@@@anchor@@@__ world!
            </paragraph>
        </document>
    </value>
);

const output = `
<value>
    <document>
        <paragraph>
            __@anchor@__<anchor />__@@focus@@__
        </paragraph>
        <paragraph>
            Hel<focus />lo, __@@@anchor@@@__ world!
        </paragraph>
    </document>
</value>
`;

export { input, output };
