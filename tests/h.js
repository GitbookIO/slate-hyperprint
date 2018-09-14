import { createHyperscript } from 'slate-hyperscript';

export const defaultHyperscript = {
    blocks: {
        paragraph: 'paragraph',
        heading: 'heading',
        code_block: 'code_block',
        code_line: 'code_line',
        image: {
            type: 'image'
        }
    },
    inlines: {
        link: 'link'
    },
    marks: {
        bold: 'bold',
        italic: 'italic'
    },
    decorations: {
        highlight: 'highlight'
    }
};

export const defaultSchema = {
    blocks: {
        image: {
            isVoid: true
        }
    }
};

export const hyperscript = {
    ...defaultHyperscript,
    schema: defaultSchema
};

const h = createHyperscript(hyperscript);

export default h;
