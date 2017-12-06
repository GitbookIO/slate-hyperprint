// @flow
import indentString from 'indent-string';
import { type Options } from './options';

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
        const { indent } = options;

        const stringifiedAttrs = Object.keys(attributes).map(key => {
            const value = attributes[key];
            const printedValue =
                typeof value === 'string'
                    ? JSON.stringify(value)
                    : `{${JSON.stringify(value)}}`;
            return `${key}=${printedValue}`;
        });

        const openingTagInner = [name].concat(stringifiedAttrs).join(' ');

        const printedChildren = children
            .map(child => child.print(options))
            .join('\n');

        if (!printedChildren.trim()) {
            return `<${openingTagInner} />`;
        }

        return [
            `<${openingTagInner}>`,
            indentString(printedChildren, 1, { indent }),
            `</${name}>`
        ].join('\n');
    }
}

export default Tag;
