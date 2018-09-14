import assert from 'assert';
import hyperprint from '../src';
import { fixtures } from './fixtures';

/**
 * Tests.
 */
describe('slate-hyperprint', () => {
    fixtures(__dirname, 'fixtures', ({ module }) => {
        const { input, output, options } = module;
        const actual = hyperprint(input, options);
        const expected = output.trim();

        assert.equal(actual, expected);
    });
});
