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
            attributes: getAttributes(document, options, false),
            children: document.nodes
                .flatMap(node => parse(node, options))
                .toArray()
        })
    ],
    block: (block, options) => [
        Tag.create({
            name: canPrintAsShorthand(block) ? block.type : block.object,
            attributes: getAttributes(
                block,
                options,
                canPrintAsShorthand(block)
            ),
            children: block.isVoid
                ? []
                : block.nodes.flatMap(node => parse(node, options)).toArray()
        })
    ],
    inline: (inline, options) => [
        Tag.create({
            name: canPrintAsShorthand(inline) ? inline.type : inline.object,
            attributes: getAttributes(
                inline,
                options,
                canPrintAsShorthand(inline)
            ),
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
                    name: canPrintAsShorthand(mark) ? mark.type : mark.object,
                    attributes: getAttributes(
                        mark,
                        options,
                        canPrintAsShorthand(mark)
                    ),
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
 * Returns attributes (with or without key)
 */
function getAttributes(
    model: SlateModel,
    options: Options,
    // True to spread the data as attributes.
    // False to keep it under `data` and to make `type` explicit
    asShorthand: boolean = true
): Object {
    let result = {};

    // type
    if (!asShorthand && model.type) {
        result.type = model.type;
    }

    // key
    if (options.preserveKeys && model.key) {
        result.key = model.key;
    }

    // data
    if (!asShorthand && !model.data.isEmpty()) {
        result.data = model.data.toJSON();
    } else {
        result = { ...result, ...model.data.toJSON() };
    }

    // isVoid
    if (!asShorthand && model.isVoid) {
        result.isVoid = true;
    }

    return result;
}

/*
 * Parse a Slate model to a Tag representation
 */
function parse(model: SlateModel, options: Options): Tag[] {
    const object = model.object || model.kind;
    const parser = PARSERS[object];
    if (!parser) {
        throw new Error(`Unrecognized Slate model ${object}`);
    }
    return parser(model, options);
}

/*
 * True if the model can be print using the shorthand syntax 
 * (data spread into attributes)
 */
function canPrintAsShorthand(model: SlateModel): boolean {
    const validAttributeKey = key => /^[a-zA-Z]/.test(key);

    return model.data.every((value, key) => validAttributeKey(key));
}

export default parse;
