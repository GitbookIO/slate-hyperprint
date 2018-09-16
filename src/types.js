/* @flow */

import type {
    Value,
    Document,
    Block,
    Inline,
    Text,
    Range,
    Decoration
} from 'slate';

export type SlateModel =
    | Value
    | Document
    | Block
    | Inline
    | Text
    | Range
    | Decoration;

export type HyperScriptOptions = {
    blocks?: Object,
    inlines?: Object,
    marks?: Object,
    decorations?: Object,
    schema?: Object
};

export type Options = {
    // True to print keys
    preserveKeys: boolean,
    // True to output a strict representation of the document (print empty text nodes for example)
    strict: boolean,
    // Prettier config to use
    prettier: Object,
    // createHyperscript() factory options
    hyperscript?: HyperScriptOptions
};
