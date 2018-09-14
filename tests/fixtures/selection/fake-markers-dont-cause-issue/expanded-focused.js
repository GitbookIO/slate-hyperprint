/** @jsx h */

import h from '../../../h';

const input = (
    <value>
        <document>
            <paragraph>
                __@cursor@__<cursor />__@@cursor@@__
            </paragraph>
            <paragraph>
                Hello, __@@@cursor@@@__ world!
            </paragraph>
        </document>
    </value>
);

const output = `
<value>
    <document>
        <paragraph>
            __@cursor@__<cursor />__@@cursor@@__
        </paragraph>
        <paragraph>Hello, __@@@cursor@@@__ world!</paragraph>
    </document>
</value>
`;

export { input, output };
