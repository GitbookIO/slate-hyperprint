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
            attributes: getAttributes(value, options),
            children: parse(value.document, options)
        })
    ],
    // COMPAT
    state: (state, options) => PARSERS.value(state, options),
    document: (document, options) => [
        Tag.create({
            name: 'document',
            attributes: getAttributes(document, options),
            children: document.nodes
                .flatMap(node => parse(node, options))
                .toArray()
        })
    ],
    block: (block, options) => [
        Tag.create({
            name: block.type,
            attributes: getAttributes(block, options),
            children: block.isVoid
                ? []
                : block.nodes.flatMap(node => parse(node, options)).toArray()
        })
    ],
    inline: (inline, options) => [
        Tag.create({
            name: inline.type,
            attributes: getAttributes(inline, options),
            children: inline.isVoid
                ? []
                : inline.nodes.flatMap(node => parse(node, options)).toArray()
        })
    ],
    text: (text, options) => {
        // COMPAT
        const leaves = text.getLeaves ? text.getLeaves() : text.getRanges();
        const leavesTags = leaves
            .flatMap(leaf => parse(leaf, options))
            .toArray();
        if (options.preserveKeys) {
            return [
                Tag.create({
                    name: 'text',
                    attributes: { key: text.key },
                    children: leavesTags
                })
            ];
        } else if (options.strict && text.text === '') {
            return [
                Tag.create({
                    name: 'text',
                    children: leavesTags
                })
            ];
        }

        return leavesTags;
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
 * Returns attributes (with or without k)
 */
function getAttributes(model: SlateModel, options: Options): Object {
    return {
        ...(options.preserveKeys && model.key ? { key: model.key } : {}),
        ...model.data.toJSON()
    };
}

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
