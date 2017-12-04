import { createHyperscript } from 'slate-hyperscript';

const h = createHyperscript({
    blocks: {
        paragraph: 'paragraph',
        heading: 'heading',
        code_block: 'code_block',
        code_line: 'code_line'
    },
    inlines: {},
    marks: {
        bold: 'bold',
        italic: 'italic'
    }
});

export default h;
