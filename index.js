'use strict'

/**
 * @see https://github.com/syntax-tree/mdast Markdown Abstract Syntax Tree format
 * @param {object} options 
 * @param {object} options.type
 * @param {object} options.depth
 * @param {object} options.value
 * @param {string|object} replaceMarkdown
 */
function replace(options, replaceMarkdown) {
    const {
        type,
        depth,
        value
    } = options || {};

    if (!replaceMarkdown) {
        throw new Error('Missing required argument `replaceMarkdown`')
    }

    if (!type) {
        throw new Error('Missing `type` in options')
    }

    if (!value) {
        throw new Error('Missing `value` in options')
    }

    if (type === 'heading' && !depth) {
        throw new Error('Missing `depth` in options')
    }

    if(typeof replaceMarkdown === 'string'){
        replaceMarkdown = this.parse(replaceMarkdown)
    }

    return transformer;

    function transformer(sourceTree) {

        const nodeIndex = sourceTree.children.findIndex(
            child =>
                child.type === type &&
                child.depth === depth &&
                child.children &&
                child.children[0] &&
                child.children[0].value === value
        );

        if (nodeIndex > -1) {
            const toNextHeading =
                sourceTree.children
                    .slice(nodeIndex + 1)
                    .findIndex(
                        child => child.type === type && child.depth === depth
                    ) + 1;

            if (toNextHeading === 0) {
                sourceTree.children = sourceTree.children
                    .slice(0, nodeIndex)
                    .concat(replaceMarkdown.children);
            } else {
                sourceTree.children = sourceTree.children
                    .slice(0, nodeIndex)
                    .concat(
                        replaceMarkdown.children,
                        sourceTree.children.slice(nodeIndex + toNextHeading)
                    );
            }
        } else {
            sourceTree.children = sourceTree.children.concat(replaceMarkdown.children);
        }

        return sourceTree;
    }
}

module.exports = replace;
