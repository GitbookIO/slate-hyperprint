/** @flow */
/** @jsx h */

import { createHyperscript } from 'slate-hyperscript';
import type { HyperScriptOptions } from '../../src/options';

const hyperscript: HyperScriptOptions = {
    blocks: {
        paragraph: 'paragraph',
        image: 'Image'
    },
    inlines: {
        link: 'link'
    },
    schema: {
        blocks: {
            Image: {
                isVoid: true
            }
        },
        inlines: {
            link: {
                isVoid: true
            }
        }
    }
};

export const options = { hyperscript };

const h = createHyperscript(hyperscript);

const input = (
    <value>
        <document>
            <paragraph>
                <inline type="link" />
            </paragraph>
            <block type="image" data={{ src: 'image.png' }} />
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
    <selection>
        <anchor path={[0, 1, 0]} />
        <focus path={[0, 1, 0]} />
    </selection>
</value>
`;

export { input, output };
