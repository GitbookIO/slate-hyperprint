/** @jsx h */

import h from '../../../h';

export const options = {
    strict: true
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
    <document>
        <paragraph>
            <text />
        </paragraph>
        <paragraph>Hello, world!</paragraph>
    </document>
    <selection>
        <anchor path={[0, 0]} />
        <focus offset={1} path={[1, 0]} />
    </selection>
</value>
`;

export { input, output };
