// @flow

import type { Options } from './types';
import { printFocusedSelection } from './selection';

const charsToEscape = ['<', '>', '{', '}', "'", '"', '\n'];

function shouldBeEscaped(s: string): boolean {
    return charsToEscape.some(char => s.includes(char));
}

function preserveTrailingSpace(s: string): string {
    let result = s;
    if (result === '') {
        return result;
    }
    if (result.trim() === '') {
        return `{'${result}'}`;
    }

    if (result.endsWith(' ')) {
        result = result.replace(/^(.*\S)(\s*)$/, "$1{'$2'}");
    }

    if (result.startsWith(' ')) {
        result = result.replace(/^(\s*)(\S.*)$/, "{'$1'}$2");
    }

    return result;
}

function escape(s: string): string {
    if (!shouldBeEscaped(s)) {
        return s;
    }

    return `{'${s
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/\n/g, '\\n')}'}`;
}

function printString(s: string, options: Options) {
    const selectionMarker: string = (options: any).selectionMarker;
    s = selectionMarker
        ? printFocusedSelection(s, selectionMarker, escape)
        : escape(s);
    return preserveTrailingSpace(s);
}

export { printString };
