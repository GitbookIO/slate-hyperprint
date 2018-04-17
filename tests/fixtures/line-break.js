/** @jsx h */

import h from '../h';

const input = (
    <value>
        <document>
            <paragraph>
                {
                    "This is a slate-hyperprint's test for strings with\n\nline breaks."
                }
            </paragraph>
        </document>
    </value>
);

const output = `
<value>
    <document>
        <paragraph>
            {
                "This is a slate-hyperprint's test for strings with\\n\\nline breaks."
            }
        </paragraph>
    </document>
</value>
`;

export { input, output };
