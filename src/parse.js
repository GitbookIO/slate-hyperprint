// @flow
import type { SlateModel } from './types';
import type { Options } from './options';
import Tag from './tag';
import { printString } from './utils';

// All Tag parsers
const PARSERS = {
    value: (value, options) => [
        Tag.create({
            name: 'value',
            attributes: value.data.toJSON(),
            children: parse(value.document, options)
        })
    ],
    // COMPAT
    state: (state, options) => PARSERS.value(state, options),
    document: (document, options) => [
        Tag.create({
            name: 'document',
            attributes: document.data.toJSON(),
            children: document.nodes
                .flatMap(node => parse(node, options))
                .toArray()
        })
    ],
    block: (block, options) => [
        Tag.create({
            name: block.type,
            attributes: block.data.toJSON(),
            children: block.isVoid
                ? []
                : block.nodes.flatMap(node => parse(node, options)).toArray()
        })
    ],
    inline: (inline, options) => [
        Tag.create({
            name: inline.type,
            attributes: inline.data.toJSON(),
            children: inline.isVoid
                ? []
                : inline.nodes.flatMap(node => parse(node, options)).toArray()
        })
    ],
    text: (text, options) => {
        // COMPAT
        const leaves = text.getLeaves ? text.getLeaves() : text.getRanges();
        return leaves.flatMap(leaf => parse(leaf, options)).toArray();
    },
    leaf: (leaf, options) =>
        leaf.marks.reduce(
            (acc, mark) => [
                Tag.create({
                    name: mark.type,
                    attributes: mark.data.toJSON(),
                    children: acc
                })
            ],
            [
                {
                    print: () => printString(leaf.text)
                }
            ]
        ),
    // COMPAT
    range: (range, options) => PARSERS.leaf(range, options)
};

/*
 * Parse a Slate model to a Tag representation
 */
function parse(model: SlateModel, options: Options): Tag[] {
    const parser = PARSERS[model.kind];
    if (!parser) {
        throw new Error(`Unrecognized Slate model ${model.kind}`);
    }
    return parser(model, options);
}

export default parse;
