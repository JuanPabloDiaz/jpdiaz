import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Node } from 'unist';
import type { Code, Html } from 'mdast'; // More specific types from Markdown Abstract Syntax Tree
import { config } from '../consts'; // Removed .ts extension for typical module resolution

// Define the plugin with proper types
const resetRemark: Plugin<[], Node, Node> = () => {
	// Return the transformer function
	return (tree: Node) => {
		visit(tree, 'code', (node: Code, index?: number, parent?: import('unist').Parent) => {
			// First transformation: add collapse metadata for code folding
			if (config.codeFoldingStartLines) {
				// Ensure node.meta is initialized if it's undefined
				node.meta = node.meta || '';
				node.meta += ` collapse={${config.codeFoldingStartLines}-1000000}`;
			}

			// Second transformation: convert mermaid code blocks to HTML
			// This needs to be handled carefully because 'visit' might have issues if you change node.type directly
			// and then continue to visit it or its children in the same pass with a different type predicate.
			// However, for 'code' to 'html', it's often fine if no further processing of this node as 'code' is needed.
			if (node.lang === 'mermaid' && parent && typeof index === 'number') {
				const htmlNode: Html = {
					type: 'html',
					value: `<pre class="mermaid">\n${node.value}\n</pre>`
				};
				parent.children[index] = htmlNode;
			}
		});
	};
};

export { resetRemark };
// Or export default resetRemark; if this is the only export and preferred style.
// Given the original was `export function resetRemark()`, `export { resetRemark };` is closer.
