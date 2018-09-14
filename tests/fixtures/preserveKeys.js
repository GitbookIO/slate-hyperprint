/** @jsx h */
/* eslint-disable react/void-dom-elements-no-children */
import h, { defaultHyperscript, defaultSchema } from '../h';

const options = {
    preserveKeys: true,
    hyperscript: {
        ...defaultHyperscript,
        schema: defaultSchema
    }
};

const input = (
    <value>
        <document key="a">
            <paragraph key="b">
                <link key="c" src="source">
                    <text key="g">Some link</text>
                </link>
                <text key="d">
                    Hello <bold>there</bold>
                </text>
            </paragraph>
            <image key="e" src="image.png" />
        </document>
    </value>
);

const output = `
<value>
    <document key="a">
        <paragraph key="b">
            <text key="6" />
            <link key="c" src="source">
                <text key="g">Some link</text>
            </link>
            <text key="d">
                Hello <bold>there</bold>
            </text>
        </paragraph>
        <image key="e" src="image.png" />
    </document>
</value>
`;

export { input, output, options };
