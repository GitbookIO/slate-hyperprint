/** @jsx h */

import h from '../../../h';

const input = (
    <value>
        <document>
            <paragraph>
                __@anchor@____@focus@__
            </paragraph>
            <paragraph>
                Hello, __@cursor@__ world!
            </paragraph>
        </document>
        <selection>
            <anchor offset={12} path={[0, 0]} />
            <focus offset={12} path={[1, 0]} />
        </selection>
    </value>
);

const output = `
<value>
    <document>
        <paragraph>__@anchor@____@focus@__</paragraph>
        <paragraph>Hello, __@cursor@__ world!</paragraph>
    </document>
    <selection>
        <anchor offset={12} path={[0, 0]} />
        <focus offset={12} path={[1, 0]} />
    </selection>
</value>
`;

export { input, output };
