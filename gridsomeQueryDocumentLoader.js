const { parseComponent } = require('vue-template-compiler');
const { parse } = require('graphql')
const glob = require('glob')
const { readFileSync } = require('fs')

const acceptedCustomBlockTypes = ['page-query', 'static-query'];

/**
 * Custom document loader for graphql-codegen.
 * 
 * Given a .vue file (or a glob pattern) that has either
 * a <static-query> or <page-query> block, this loader
 * extracts the query definition.
 * 
 * See more info on https://www.graphql-code-generator.com/docs/config-reference/documents-field#custom-document-loader
 *
 * Example 1:
 *
 * ```vue
 * // MyPage.vue
 * ...
 * <page-query>
 * query Journal {
 *   posts: allJournalPost {
 *     edges {
 *       node {
 *         id
 *         path
 *         title
 *         description
 *       }
 *     }
 *   }
 * }
 * </page-query>
 * ...
 * ```
 *
 * Example 2:
 *
 * ```vue
 * // MyComponent.vue
 * ...
 * <static-query>
 * query {
 *  metadata {
 *    siteName
 *  }
 * }
 * </static-query>
 * ...
 * ```
 */
const gridsomeQueryDocumentLoader = (vueFilepathOrGlob) => {
  try {
    const files = glob.sync(vueFilepathOrGlob) ?? [];

    const mergedFilesContents = files.map((filePath) => {
      const fileContent = readFileSync(filePath, 'utf-8');
      const sfc = parseComponent(fileContent);
      const gridsomeQueryBlock = sfc.customBlocks.find(
        (block) => acceptedCustomBlockTypes.includes(block.type)
      );
      if (gridsomeQueryBlock) {
        return gridsomeQueryBlock.content;
      }
    }).filter(Boolean)
      .join('\n')
      .trim();

    if (mergedFilesContents) {
      // Parse graphql from the custom block 
      return parse(mergedFilesContents);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = gridsomeQueryDocumentLoader;
