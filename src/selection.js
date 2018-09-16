// @flow
import type { Value } from 'slate';
import type { Options } from './types';

/**
 * Checks is selection at initial position: it is collapsed and is before the first character of the first text node
 *
 * @param value
 * @returns {boolean}
 */
export const isSelectionAtStartOfDocument = ({
    selection,
    document
}: Value): boolean =>
    selection.isCollapsed &&
    selection.anchor.offset === 0 &&
    selection.focus.offset === 0 &&
    selection.anchor.isAtStartOfNode(document.getFirstText());

/**
 * Builds the open part of the selection marker text.
 * Ensures that selection markers will not cause issues in hyperprint output for documents that have already includes selection markers as real texts.
 * If document text contains open or close part of the selection marker, function appends '@' and tries to make open/close marker texts unique in the document.
 * @param {Value} value
 * @param {string} open
 * @returns {string}
 */
const selectionOpenMarker = (value: Value, open: string = '__@'): string => {
    const text: string = value.document.text;
    const close = [...open].reverse().join('');

    return text.includes(open) || text.includes(close)
        ? selectionOpenMarker(value, `${open}@`)
        : open;
};

/**
 * Insert selection tag markers
 *
 * The easiest way to print focused selection tags (anchor, focus, cursor) is to add them explicitly into the document as texts.
 * This function inserts special text strings that will be replaced by focused selection tags while printing the document.
 * It also saves selection marker open tag into the options for replacement while printing leaf nodes.
 * @param {Value} value
 * @param {Options} options
 * @returns {Value}
 */
export const insertFocusedSelectionTagMarkers = (
    value: Value,
    options: Options
): Value => {
    const { selection } = value;
    const { isExpanded, isBlurred, isUnset, isForward, anchor } = selection;

    if (isUnset || isBlurred) {
        return value;
    }

    const open = selectionOpenMarker(value);
    const close = [...open].reverse().join('');

    let tags = ['cursor'];

    if (isExpanded) {
        tags = isForward ? ['focus', 'anchor'] : ['anchor', 'focus'];
    }

    const change = value.change();

    change.call(ch =>
        tags.forEach(tag => {
            const { path, offset } = selection[tag] || anchor;
            ch.insertTextByPath(path, offset, `${open}${tag}${close}`);
        })
    );

    // selectionMarker in options saved only for internal usage
    (options: any).selectionMarker = open;

    return change.value;
};

/**
 * Prints focused selection tags with escaping texts around them
 *
 * @param {string} s
 * @param {string} marker
 * @param {Function} escape
 * @returns {string}
 */
export const printFocusedSelection = (
    s: string,
    marker: string,
    escape: Function
): string => {
    const open = marker;
    const close = marker
        .split('')
        .reverse()
        .join('');

    const selection = new RegExp(`${open}(focus|anchor|cursor)${close}`);
    const splitter = new RegExp(`(${open}(?:focus|anchor|cursor)${close})`);

    return s
        .split(splitter)
        .map(
            text =>
                selection.test(text)
                    ? text.replace(selection, '<$1 />')
                    : escape(text)
        )
        .join('');
};
