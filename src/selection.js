// @flow
import type { Value } from 'slate';
import type { Options } from './options';

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
 * Ensures that selection markers will not cause issues in hyperprint output for documents that have already includes selection markers as texts.
 * If document text contains open or close part of the selection marker, function appends '@' to make open/close marker texts unique in the document.
 * @param {Value} value
 * @param {string} open
 * @returns {string}
 */
const selectionOpenMarker = (value: Value, open: string = '__@'): string => {
    const text: string = value.document.text;
    const close = [...open].reverse().join();

    return text.includes(open) || text.includes(close)
        ? selectionOpenMarker(value, `${open}@`)
        : open;
};

/**
 * Insert selection tag markers
 *
 * The easiest way to print focused selection tags (anchor, focus, cursor) is to add them explicitly into the document as texts.
 * This function inserts special text strings that will be replaced by focused selection tags while printing the document.
 * It also saves selection marker RegExp into the options for future replacement while printing leaf nodes.
 * @param {Value} value
 * @param {Options} options
 * @returns {Value}
 */
export const insertFocusedSelectionTagMarkers = (
    value: Value,
    options: Options
): Value => {
    const { selection } = value;
    const { isCollapsed, isBlurred, isForward, anchor } = selection;

    if (isBlurred) {
        return value;
    }

    const open = selectionOpenMarker(value);
    const close = [...open].reverse().join('');

    let tags = isForward ? ['focus', 'anchor'] : ['anchor', 'focus'];

    if (isCollapsed) {
        tags = ['cursor'];
    }

    const change = value.change();

    change.call(ch =>
        tags.forEach(tag => {
            const { path, offset } = selection[tag] || anchor;
            ch.insertTextByPath(path, offset, `${open}${tag}${close}`);
        })
    );

    (options: any).selectionMarkerRegExp = new RegExp(
        `${open}(${tags.join('|')})${close}`,
        'g'
    );

    return change.value;
};
