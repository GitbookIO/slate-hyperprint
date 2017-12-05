# slate-hyperprint

[![NPM version](https://badge.fury.io/js/slate-hyperprint.svg)](http://badge.fury.io/js/slate-hyperprint)

A Slate plugin to convert Slate models to their slate-hyperscript representation.

See the [online demo](https://soreine.github.io/slate-hyperprint), that converts a Slate JSON representation to a Slate hyperscript representation.

You can use `slate-hyperprint` as a library to:

- Run a script to easily convert Slate tests written in Yaml/JSON to hyperscript.
- Improve the output of unit tests by comparing hyperscript strings instead of JSON values.
- Facilitate debugging and console logging of Slate values.

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

# Test

```
yarn run test
```

# Build

```
yarn run build
```
