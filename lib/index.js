// @flow
import indentString from 'indent-string';

import {
    type Document,
    type Block,
    type Inline,
    type Range,
    type Mark,
    type Text
} from 'slate';

type SlateModel = Document | Block | Inline | Text | Range | Mark;

const INDENT = 4;

// All printer functions
const PRINTERS = {
    value: value =>
        printTag({
            name: 'value',
            attributes: value.data.toJSON(),
            children: print(value.document)
        }),
    document: document => {
        const children = document.nodes.map(print).join('\n');
        return printTag({
            name: 'document',
            attributes: document.data.toJSON(),
            children
        });
    },
    block: block => {
        const children = block.nodes.map(print).join('\n');
        return printTag({
            name: block.type,
            attributes: block.data.toJSON(),
            children
        });
    },
    inline: inline => {
        const children = inline.nodes.map(print).join('\n');
        return printTag({
            name: inline.type,
            attributes: inline.data.toJSON(),
            children
        });
    },
    text: text => `{${JSON.stringify(text.text)}}`,
    range: () => 'TODO',
    mark: () => 'TODO'
};

/*
 * Print a Slate model to hyperscript
 */
function print(model: SlateModel): string {
    const printer = PRINTERS[model.kind];
    if (!printer) {
        throw new Error(`Unrecognized Slate model ${model.kind}`);
    }
    return printer(model);
}

function printTag(
    args: {
        name?: string,
        children?: string,
        attributes?: Object,
        indent?: number
    } = {}
): string {
    const { name = '', attributes = {}, children = '', indent = INDENT } = args;

    let attrs = Object.keys(attributes)
        .map(key => {
            const value = attributes[key];
            const printedValue =
                typeof value === 'string'
                    ? JSON.stringify(value)
                    : `{${JSON.stringify(value)}}`;
            return `${key}=${printedValue}`;
        })
        .join(' ');
    if (attrs) {
        attrs = ` ${attrs}`;
    }

    if (children == '') {
        return `<${name}${attrs}/>`;
    }
    return `<${name}${attrs}>\n${indentString(children, indent)}\n</${name}>`;
}

export { print };
