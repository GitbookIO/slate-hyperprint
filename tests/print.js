/** @jsx h */

import { createHyperscript } from 'slate-hyperscript';
import { print } from '../lib';
import expect from 'expect';

const h = createHyperscript({
    blocks: {
        paragraph: 'paragraph',
        heading: 'heading',
        code_block: 'code_block',
        code_line: 'code_line'
    },
    inlines: {},
    marks: {}
});

describe('print', () => {
    it('should do something', () => {
        const input = (
            <value>
                <document>
                    <heading>{'Slate + Code Highlighting'}</heading>
                    <paragraph>
                        {
                            'This page is a basic example of Slate + slate-prism + slate-edit-code plugins:'
                        }
                    </paragraph>
                    <code_block syntax="javascript">
                        <code_line>{'// Some javascript'}</code_line>
                        <code_line>{"var msg = 'Hello world';"}</code_line>
                    </code_block>

                    <paragraph>
                        {'Syntax can be set on a per-block basis:'}
                    </paragraph>
                    <code_block syntax="html">
                        <code_line>{'<!-- Some HTML -->'}</code_line>
                        <code_line>{'<b>Hello World</b>'}</code_line>
                    </code_block>
                </document>
            </value>
        );
        const expected = `
<value>
    <document>
        <heading>{'Slate + Code Highlighting'}</heading>
        <paragraph>
            {
                'This page is a basic example of Slate + slate-prism + slate-edit-code plugins:'
            }
        </paragraph>
        <code_block syntax="javascript">
            <code_line>{'// Some javascript'}</code_line>
            <code_line>{"var msg = 'Hello world';"}</code_line>
        </code_block>
        <paragraph>{'Syntax can be set on a per-block basis:'}</paragraph>
        <code_block syntax="html">
            <code_line>{'<!-- Some HTML -->'}</code_line>
            <code_line>{'<b>Hello World</b>'}</code_line>
        </code_block>
    </document>
</value>
        `;
        const printed = print(input);
        expect(printed).toEqual(expected.trim());
    });
});
