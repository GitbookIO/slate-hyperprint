/** @jsx h */

import h from '../../../h';

const input = (
    <value>
        <document>
            <paragraph />
            <paragraph>Hello, world!</paragraph>
        </document>
        <selection
            marks={[{ type: 'bold' }, { data: { lang: 'css' }, type: 'code' }]}
        >
            <anchor path={[1, 0]} />
            <focus path={[1, 0]} />
        </selection>
    </value>
);

const output = `
<value>
    <document>
        <paragraph />
        <paragraph>Hello, world!</paragraph>
    </document>
    <selection
        marks={[{ type: 'bold' }, { data: { lang: 'css' }, type: 'code' }]}
    >
        <anchor path={[1, 0]} />
        <focus path={[1, 0]} />
    </selection>
</value>
`;

export { input, output };
