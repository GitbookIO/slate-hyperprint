/* @flow */
import stringify from 'stringify-object';
import sortObject from './sortObject';

// Based on https://github.com/algolia/react-element-to-jsx-string/blob/9518c28d9ba2643c551f5fe8a2433cb097018466/src/formatter/formatComplexDataStructure.js

function noRefCheck() {}

function printComplexDataStructure(value: Object | Array<any>): string {
    // Sort keys for output stability
    const normalizedValue = sortObject(value);

    const stringifiedValue = stringify(normalizedValue, {
        transform: (currentObj, prop, originalResult) => {
            const currentValue = currentObj[prop];

            if (typeof currentValue === 'function') {
                return noRefCheck;
            }

            return originalResult;
        }
    });

    // Always print values inline for now...
    return stringifiedValue
        .replace(/\s+/g, ' ')
        .replace(/{ /g, '{')
        .replace(/ }/g, '}')
        .replace(/\[ /g, '[')
        .replace(/ ]/g, ']');
}

export default printComplexDataStructure;
