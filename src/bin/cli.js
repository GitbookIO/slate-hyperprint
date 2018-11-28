#!/usr/bin/env node
/* @flow */

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Slate from '@gitbook/slate';
import meow from 'meow';
import hyperprint from '../';

const inputPath = meow(`
    Usage
        $ slate-hyperprint <path>
`).input[0];

if (inputPath) {
    const ext = path.extname(inputPath);

    let json;
    switch (ext) {
        case '.yaml':
        case '.yml':
            json = yaml.safeLoad(fs.readFileSync(inputPath));
            break;
        case '.json':
        case '.js':
            // eslint-disable-next-line
            json = require(inputPath);
            break;
        default:
            throw new Error(
                'The slate-hyperprint CLI only supports YAML, JSON and JS inputs'
            );
    }

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
