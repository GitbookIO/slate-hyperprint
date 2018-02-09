/** @jsx h */

import h from '../h';

const options = {
    preserveKeys: true
};

const input = (
    <value>
        <document>
            <image data1 data2="2" a="b" key="key1" />
            <block type="image" key="key2" isVoid data={{ src: 'image.png' }} />
        </document>
    </value>
);

const output = `
<value>
    <document key="5">
        <image a="b" data1 data2="2" key="key1" />
        <image key="key2" src="image.png" />
    </document>
</value>
`;

export { input, output, options };
