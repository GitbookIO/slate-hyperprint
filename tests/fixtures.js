import fs from 'fs';
import { basename, extname, resolve } from 'path';
import { KeyUtils } from 'slate';

export const fixtures = (...args) => {
    let fn = args.pop();
    let options = { skip: false };

    if (typeof fn !== 'function') {
        options = fn;
        fn = args.pop();
    }

    const path = resolve(...args);
    const files = fs.readdirSync(path);
    const dir = basename(path);
    const d = options.skip ? describe.skip : describe;

    d(dir, () => {
        files.forEach(file => {
            const p = resolve(path, file);
            const stat = fs.statSync(p);

            if (stat.isDirectory()) {
                fixtures(path, file, fn);
            }

            if (
                stat.isFile() &&
                (file.endsWith('.js') || file.endsWith('.jsx')) &&
                !file.startsWith('.') &&
                // Ignoring `index.ts` files allows us to use the fixtures directly
                // from the top-level directory itself, instead of only children.
                file !== 'index.js'
            ) {
                const name = basename(file, extname(file));

                // This needs to be a non-arrow function to use `this.skip()`.
                it(name, () => {
                    // Ensure that the key generator is reset. We have to do this here
                    // because the `require` call will create the Slate objects.
                    KeyUtils.resetGenerator();
                    // eslint-disable-next-line global-require,import/no-dynamic-require
                    const module = require(p);

                    if (module.skip) {
                        const message = `Test '${name}' is skipped`;
                        if (process.env.CI) {
                            throw new Error(message);
                        } else {
                            console.warn(message);
                        }

                        return;
                    }

                    fn({ name, path, module });
                });
            }
        });
    });
};
