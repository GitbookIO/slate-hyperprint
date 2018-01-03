# slate-hyperprint

[![NPM version](https://badge.fury.io/js/slate-hyperprint.svg)](http://badge.fury.io/js/slate-hyperprint)

A library to convert Slate models to their slate-hyperscript representation.

You can use `slate-hyperprint` as a library to:

- Run a script to easily convert Slate tests written in Yaml/JSON to hyperscript.
- Improve the output of unit tests by comparing hyperscript strings instead of JSON values.
- Facilitate debugging and console logging of Slate values.

See the [online demo](https://soreine.github.io/slate-hyperprint), that converts a Slate JSON representation to a Slate hyperscript representation.

# Setup

```
yarn add slate-hyperprint [--dev]
```

# Usage

```js
import Slate from 'slate';
import hyperprint from 'slate-hyperprint';

console.log(
    hyperprint(
        Slate.Value.create({
            document: Slate.Document.create({
                nodes: [
                    Slate.Block.create({
                        type: 'paragraph',
                        data: { a: 1 },
                        nodes: [
                            Slate.Text.create('Hello')
                        ]
                    }
                )]
            })
        })
    )
);
// <value>
//   <document>
//     <paragraph a={1}>
//       Hello
//     </paragraph>
//   </document>
// </value>
```

# Options

`slate-hyperprint` accepts an option object:

```js
hyperprint(value, options);
```

- `prettier: Object = { semi: false, singleQuote: true, tabWidth: 4 }`
  Prettier config to use when formatting the output JSX.

# Test

```
yarn run test
```

# Build

```
yarn run build
```

# CLI

slate-hyperprint also export a command line interface tool that converts yaml files to jsx.
When installed globally (`npm install slate-hyperprint --global`) it can be used like so:

```
$ slate-hyperprint document.yaml
```

It will load the file, create a Slate document and print it to the console in jsx.
Note: it will look for a `value.document`, `state.document` or `document` property.
It will consider the whole content as the document if none are found.

# Thanks

The React equivalent [react-element-to-jsx-string](https://github.com/algolia/react-element-to-jsx-string) is and will remain a great source of inspiration.
