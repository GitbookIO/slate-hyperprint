#!/usr/bin/env node
/* @flow */

import fs from 'fs';
import yaml from 'js-yaml';
import Slate from 'slate';
import meow from 'meow';
import hyperprint from '../';

const { input } = meow(`
    Usage
        $ slate-hyperprint <path>
`);

if (input.length > 0) {
    const [path] = input;
    const json = yaml.safeLoad(fs.readFileSync(path));
    const document =
        (json.value && json.value.document) ||
        (json.state && json.state.document) ||
        json.document ||
        json;
    // COMPAT: Use Value or State
    const state = (Slate.Value || Slate.State).create({ document });

    // eslint-disable-next-line no-console
    console.log(hyperprint(state.document));
}
