import assert from 'assert';
import fs from 'fs';
import { basename, extname, resolve } from 'path';
import { resetKeyGenerator } from 'slate';
import hyperprint from '../src';

/**
 * Tests.
 */

describe('slate-hyperprint', () => {
    const fixturesDir = resolve(__dirname, './fixtures');
    const tests = fs
        .readdirSync(fixturesDir)
        .filter(t => t[0] != '.')
        .map(t => basename(t, extname(t)));

    tests.forEach(test => {
        it(test, () => {
            resetKeyGenerator();
            // eslint-disable-next-line
            const module = require(resolve(fixturesDir, test));
            const { input, output, options } = module;
            const actual = hyperprint(input, options);
            const expected = output.trim();

            assert.equal(actual, expected);
        });
    });
});
