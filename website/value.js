/** @jsx h */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createHyperscript } from '@gitbook/slate-hyperscript';

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

export default (
    <value>
        <document>
            <heading>{'Slate Hyperprint'}</heading>
            <paragraph>
                {
                    "This page is a demo of slate-hyperprint, a tool to print a slate model to its slate-hyperscript's string representation."
                }
            </paragraph>

            <paragraph>{'Throw in some JavaScript syntax:'}</paragraph>

            <code_block syntax="javascript">
                <code_line>{'// Some javascript'}</code_line>
                <code_line>{"var msg = 'Hello world';"}</code_line>
            </code_block>

            <paragraph>{'Properly escapes HTML too:'}</paragraph>

            <code_block syntax="html">
                <code_line>{'<!-- Some HTML -->'}</code_line>
                <code_line>{'<b>Hello World</b>'}</code_line>
            </code_block>
        </document>
    </value>
);
