const remark = require('remark');
const remarkReplaceBlock = require('../index');

const testMarkdown = `# summary\n\n## API\n\n- test\n`

test('heading is existent', () => {
    const processor = remark()
        .use(remarkReplaceBlock, { type: 'heading', depth: 2, value: 'API' }, '## update\n\n- successful\n')

    const mdString = processor.processSync(testMarkdown).toString();

    expect(mdString).toBe(`# summary\n\n## update\n\n-   successful\n`);
});

test('heading is nonexistent', () => {
    const processor = remark()
        .use(remarkReplaceBlock, { type: 'heading', depth: 2, value: 'Test' }, '## update\n\n- successful\n')

    const mdString = processor.processSync(testMarkdown).toString();

    expect(mdString).toBe(`# summary\n\n## API\n\n-   test\n\n## update\n\n-   successful\n`);
});