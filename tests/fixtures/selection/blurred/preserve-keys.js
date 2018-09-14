/** @jsx h */

import h from '../../../h';

export const options = {
    preserveKeys: true
};

const input = (
    <value>
        <document key="a">
            <paragraph key="b">
                <text key="c" />
            </paragraph>
            <paragraph key="d">
                <text key="e">Hello, world!</text>
            </paragraph>
        </document>
        <selection>
            <anchor key="c" />
            <focus key="e" offset={1} />
        </selection>
    </value>
);

const output = `
<value>
    <document key="a">
        <paragraph key="b">
            <text key="c" />
        </paragraph>
        <paragraph key="d">
            <text key="e">Hello, world!</text>
        </paragraph>
    </document>
    <selection>
        <anchor key="c" />
        <focus key="e" offset={1} />
    </selection>
</value>
`;

export { input, output };
