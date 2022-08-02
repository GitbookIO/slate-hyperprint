// @flow
import isPlainObject from 'is-plain-object';
import printComplexDataStructure from './printComplexDataStructure';

/*
Based on
https://github.com/algolia/react-element-to-jsx-string/blob/master/src/formatter/formatPropValue.js
*/

const escape = (s: string): string => s.replace(/"/g, '&quot;');

/*
 * Print a tag attribute, for example as 'key={value}' or 'key="value"' or 'key'
 */
function printAttributeValue(value: any): string {
    if (typeof value === 'number') {
        return `{${String(value)}}`;
    }

    if (typeof value === 'string') {
        return `"${escape(value)}"`;
    }

    // > "Symbols (new in ECMAScript 2015, not yet supported in Flow)"
    // @see: https://flow.org/en/docs/types/primitives/
    // $FlowFixMe: Flow does not support Symbol
    if (typeof value === 'symbol') {
        throw new Error('not implemented');
    }

    if (typeof value === 'function') {
        throw new Error('not implemented');
    }

    if (value instanceof Date) {
        return `{new Date("${value.toISOString()}")}`;
    }

    if (isPlainObject(value) || Array.isArray(value)) {
        return `{${printComplexDataStructure(value)}}`;
    }

    return `{${String(value)}}`;
}

/*
 * Print a tag attribute to 'key={value}' or 'key' for `true`
 */
function printAttribute(key: string, value: any) {
    if (value === true) {
        return key;
    }

    return `${key}=${printAttributeValue(value)}`;
}

export default printAttribute;
