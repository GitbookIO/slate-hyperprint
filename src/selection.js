// @flow
import type { Value } from 'slate';

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
