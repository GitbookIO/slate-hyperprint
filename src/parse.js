// @flow
import type { Block, Inline } from 'slate';
import type { SlateModel } from './types';
import type { HyperScriptOptions, Options } from './options';
import Tag from './tag';
import { printString } from './utils';
import {
    applyDecorationMarks,
    getModelType,
    isDecorationMark
} from './decoration';
import {
    isSelectionAtStartOfDocument,
    insertFocusedSelectionTagMarkers
} from './selection';

// All Tag parsers
const PARSERS = {
    value: (value, options) => [
        Tag.create({
            name: 'value',
            attributes: getAttributes(value, options),
            children: [
                ...parse(value.document, options),
                ...(value.selection.isBlurred &&
                !isSelectionAtStartOfDocument(value)
                    ? PARSERS.selection(
                          value.selection,
                          options,
                          isSelectionAtStartOfDocument(value)
                      )
                    : [])
            ]
        })
    ],
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
            name: getTagName(block, options),
            attributes: getAttributes(
                block,
                options,
                canPrintAsShorthand(block)
            ),
            children: isVoid(block, options)
                ? []
                : block.nodes.flatMap(node => parse(node, options)).toArray()
        })
    ],
    inline: (inline, options) => [
        Tag.create({
            name: getTagName(inline, options),
            attributes: getAttributes(
                inline,
                options,
                canPrintAsShorthand(inline)
            ),
            children: isVoid(inline, options)
                ? []
                : inline.nodes.flatMap(node => parse(node, options)).toArray()
        })
    ],
    text: (text, options) => {
        const leaves = text.getLeaves();
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
                    name: getTagName(mark, options),
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
                    print: () => {
                        const selectionMarker = (options: any)
                            .selectionMarkerRegExp;
                        const print = printString(leaf.text);
                        return selectionMarker
                            ? print.replace(selectionMarker, '<$1 />')
                            : print;
                    }
                }
            ]
        ),
    selection: (selection, options, initial) => {
        const children =
            options.preserveKeys || !initial
                ? [
                      ...PARSERS.point(selection.anchor, options, 'anchor'),
                      ...PARSERS.point(selection.focus, options, 'focus')
                  ]
                : [];
        return selection.isFocused || children.length
            ? [
                  Tag.create({
                      name: 'selection',
                      attributes: selection.isFocused ? { focused: true } : {},
                      children
                  })
              ]
            : [];
    },
    point: (point, options, name) => [
        Tag.create({
            name,
            attributes: {
                ...(point.offset !== 0 ? { offset: point.offset } : {}),
                // print either path or key
                ...(options.preserveKeys
                    ? { key: point.key }
                    : { path: point.path.toArray() })
            }
        })
    ]
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
        // Spread the data as individual attributes
        result = { ...result, ...model.data.toJSON() };
    }

    if (result.type && isDecorationMark(model)) {
        result.type = getModelType(result.type);
    }

    return result;
}

/*
 * Parse a Slate model to a Tag representation
 */
function parse(model: SlateModel, options: Options): Tag[] {
    const object = model.object;
    const parser = PARSERS[object];
    if (!parser) {
        throw new Error(`Unrecognized Slate model ${object}`);
    }

    if (object === 'value') {
        if (model.decorations.size > 0) {
            model = applyDecorationMarks(model);
        }
        if (model.selection.isFocused) {
            model = insertFocusedSelectionTagMarkers(model, options);
        }
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

/**
 * Checks if the model if void node via hyperscript options schema object
 * @param {Block | Inline} model
 * @param {Options} options
 * @returns {boolean}
 */
function isVoid(model: Block | Inline, options: Options): boolean {
    if (!options.hyperscript) {
        return false;
    }

    const { schema } = options.hyperscript;
    const { object, type } = model;

    const schemaObject = `${object}s`;
    const isVoidNode =
        !!schema &&
        schema[schemaObject] &&
        schema[schemaObject][type] &&
        schema[schemaObject][type].isVoid;

    return isVoidNode;
}

function getTagName(model: SlateModel, options: Options): string {
    const tagName = getHyperscriptTag(model, options.hyperscript);

    return canPrintAsShorthand(model) ? tagName : model.object;
}

/**
 * Returns hyperscript tag according to createHyperscript() factory options
 * @param {SlateModel} model
 * @param {HyperscriptOptions} hyperscript
 * @returns {string}
 */
function getHyperscriptTag(
    model: SlateModel,
    hyperscript?: HyperScriptOptions
): string {
    const modelType = getModelType(model);

    const objects = `${model.object}s`;
    if (!hyperscript || !hyperscript[objects]) {
        return modelType;
    }

    const tagNameMap = hyperscript[objects];

    const tagName = Object.keys(tagNameMap).find(
        tag => tagNameMap[tag] === modelType
    );

    return tagName || modelType;
}

export default parse;
