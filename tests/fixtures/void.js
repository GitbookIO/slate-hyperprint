/** @jsx h */

import h from '../h';

const input = (
    <value>
        <document>
            <paragraph>
                <inline type="link" isVoid />
            </paragraph>
            <block type="image" isVoid data={{ src: 'image.png' }} />
        </document>
    </value>
);

const output = `
<value>
    <document>
        <paragraph>
            <link />
        </paragraph>
        <image src="image.png" />
    </document>
</value>
`;

export { input, output };
