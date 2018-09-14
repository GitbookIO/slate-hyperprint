/** @jsx h */

import h from '../../../h';

export const options = {
    preserveKeys: true
};

const input = (
    <value>
        <document key="a">
            <paragraph key="b">
                <text key="c">
                    <anchor />
                </text>
            </paragraph>
            <paragraph key="d">
                <text key="e">
                    H<focus />ello, world!
                </text>
            </paragraph>
        </document>
    </value>
);

const output = `
<value>
    <document key="a">
        <paragraph key="b">
            <text key="c">
                <anchor />
            </text>
        </paragraph>
        <paragraph key="d">
            <text key="e">
                H<focus />ello, world!
            </text>
        </paragraph>
    </document>
</value>
`;

export { input, output };
