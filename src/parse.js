// @flow
import type { SlateModel } from './types';
import type { Options } from './options';
import Tag from './tag';

// All Tag parsers
const PARSERS = {
    value: (value, options) =>
        Tag({
            name: 'value',
            attributes: value.data.toJSON(),
            children: [parse(value.document, options)]
        }),
    document: (document, options) =>
        Tag({
            name: 'document',
            attributes: document.data.toJSON(),
            children: document.nodes.toArray().map(node => parse(node, options))
        }),
    block: (block, options) =>
        Tag({
            name: block.type,
            attributes: block.data.toJSON(),
            children: block.nodes.toArray().map(node => parse(node, options))
        }),
    inline: (inline, options) =>
        Tag({
            name: inline.type,
            attributes: inline.data.toJSON(),
            children: inline.nodes.toArray().map(node => parse(node, options))
        }),
    text: (text, options) => ({
        print: () => `{${JSON.stringify(text.text)}}`
    }),
    range: (range, options) => 'TODO'
};

/*
 * Parse a Slate model to a Tag representation
 */
function parse(model: SlateModel, options: Options): Tag {
    const parser = PARSERS[model.kind];
    if (!parser) {
        throw new Error(`Unrecognized Slate model ${model.kind}`);
    }
    return parser(model, options);
}

export default parse;
