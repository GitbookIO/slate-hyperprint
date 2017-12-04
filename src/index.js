/* @flow */

import print from './print';
import type { Options } from './options';
import type { SlateModel } from './types';

function hyperprint(model: SlateModel, { indent = '    ' }: Options = {}) {
    if (!model) {
        throw new Error('slate-hyperprint: Expected a Slate model');
    }

    const options = {
        indent
    };

    return print(model, options);
}

export default hyperprint;
