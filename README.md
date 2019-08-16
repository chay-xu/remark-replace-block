# remark-replace-block

[**remark**](https://github.com/remarkjs/remark/tree/master/packages/remark) plugin to replace block content.

> Note: if the block content is not found, the replace nodes is will added to the end.

## Install

[npm](https://www.npmjs.com/):

```sh
npm install remark-replace-block
```

## Use

We have the following file, `example.md`
```markdown
# title

## API
- this one
- this two
```
And the script, `example.js`
```js
const remark = require('remark');
const replaceBlock = require('remark-replace-block');
const vfile = require('to-vfile');

remark()
    .use(replaceBlock, { type: 'heading', depth: 2, value: 'API' }, '## update\n* - this is change')
    .process(vfile.readSync('example.md'), function (err, file) {
        if (err) throw err
        console.log(String(file))
    })
```
Yields:
```markdown
# title

## update
- this is change
```
