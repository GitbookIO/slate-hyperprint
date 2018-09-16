/* @flow */

import prettier from 'prettier/standalone';
import babylon from 'prettier/parser-babylon';

import parse from './parse';
import type { SlateModel, Options } from './types';

const DEFAULT_OPTIONS: Options = {
    preserveKeys: false,
    strict: false,
    prettier: {
        semi: false,
        singleQuote: true,
        tabWidth: 4
    }
};

function hyperprint(
    model: SlateModel,
    optionsParam?: Options = DEFAULT_OPTIONS
) {
    if (!model) {
        throw new Error('slate-hyperprint: Expected a Slate model');
    }

    const options = {
        ...DEFAULT_OPTIONS,
        ...optionsParam
    };

    const printed = parse(model, options)
        .map(tag => tag.print(options))
        .join('');

    const formatted = prettier.format(printed, {
        ...options.prettier,
        parser: 'babylon',
        plugins: [babylon]
    });

    const noSemi = formatted.trim().replace(/^;/, '');

    return noSemi;
}

// Directly print to the console
hyperprint.log = (model: SlateModel, optionsParam?: Options) =>
    // eslint-disable-next-line no-console
    console.log(hyperprint(model, optionsParam));

export default hyperprint;
