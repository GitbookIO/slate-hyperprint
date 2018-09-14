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
