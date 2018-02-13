/* @flow */

export type Options = {
    // True to print keys
    preserveKeys: boolean,
    // True to output a strict representation of the document (print empty text nodes for example)
    strict: boolean,
    // Prettier config to use
    prettier: Object
};
