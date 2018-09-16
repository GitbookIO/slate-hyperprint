// @flow
import { type Options } from './types';
import printAttribute from './attributes';

/*
 * Represents a printable JSX tag
 */
class Tag {
    name: string;
    children: Tag[];
    attributes: Object;

    constructor(
        args: {
            name?: string,
            children?: Tag[],
            attributes?: Object
        } = {}
    ): Tag {
        const { name, children, attributes } = args;

        this.name = name || '';
        this.children = children || [];
        this.attributes = attributes || {};

        return this;
    }

    static create(...args) {
        return new Tag(...args);
    }

    // Print this tag
    print(options: Options): string {
        const { name, children, attributes } = this;

        const stringifiedAttrs = Object.keys(attributes)
            .sort()
            .map(key => printAttribute(key, attributes[key]));

        const openingTagInner = [name].concat(stringifiedAttrs).join(' ');

        const printedChildren = children
            .map(child => child.print(options))
            // Filter out empty strings
            .filter(Boolean);

        if (printedChildren.length === 0) {
            return `<${openingTagInner} />`;
        }

        return [
            `<${openingTagInner}>`,
            printedChildren.join(''),
            `</${name}>`
        ].join('');
    }
}

export default Tag;
