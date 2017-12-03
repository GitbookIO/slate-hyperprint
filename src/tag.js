// @flow
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

        if (children.length === 0) {
            return `<${openingTagInner}/>`;
        }

        const printedChildren = children
            .map(child => indent + child.print(options))
            .join('\n');

        return [`<${openingTagInner}>`, printedChildren, `</${name}>`].join(
            '\n'
        );
    }
}

export default (...args: *) => new Tag(...args);
