import { h as _h } from 'hastscript'; // s is not used
import type { Properties as HastProperties } from 'hast';
import type { Plugin } from 'unified';
import type { Node, Parent } from 'unist';
import type { Paragraph, PhrasingContent } from 'mdast';
// Assuming mdast-util-directive exports this type. If not, a custom one might be needed.
import type { TextDirective } from 'mdast-util-directive';
import { visit } from 'unist-util-visit';

// Type for the custom h function return value
interface MdastHtmlNode extends Paragraph {
  data: {
    hName: string;
    hProperties: HastProperties;
  };
  children: PhrasingContent[]; // Usually empty for an <i> tag from textDirective
}

function h(
  el: string,
  attrs: HastProperties = {},
  children: PhrasingContent[] = [] // textDirective for <i> usually won't have children processed this way
): MdastHtmlNode {
  const { tagName, properties } = _h(el, attrs);
  return {
    type: 'html', // Use the correct node type for raw HTML
    value: _h(el, attrs).outerHTML, // Store the raw HTML string in the `value` property
  };
}

const remarkHtml: Plugin<[], Node, Node> = () => {
  const transformer = (tree: Node) => {
    visit(tree, 'textDirective', (node: TextDirective, index?: number, parent?: Parent) => {
      if (!parent || typeof index !== 'number') {
        return;
      }

      // The original code checks type and name again, but visit with 'textDirective'
      // predicate already narrows it down. We only need to check node.name here.
      if (node.name !== 'i') {
        return;
      }

      // textDirective attributes are expected to be HastProperties by our `h` function
      const attributes = (node.attributes || {}) as HastProperties;

      // Replace the textDirective node with the new MdastHtmlNode
      // textDirective nodes typically don't have children that need to be preserved in this context.
      // If they did, node.children would need to be passed to h().
      parent.children[index] = h(node.name, attributes);
    });
  };
  return transformer; // Correctly return the transformer
};

export { remarkHtml };
// Or export default remarkHtml; if preferred
