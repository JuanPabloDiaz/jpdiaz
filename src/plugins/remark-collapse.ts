import { h as _h } from 'hastscript'; // s is not used
import type { Properties as HastProperties } from 'hast';
import type { Plugin } from 'unified';
import type { Node, Parent } from 'unist';
import type { Paragraph, Text, PhrasingContent, Content } from 'mdast';
// Assuming mdast-util-directive exports these types.
import type { ContainerDirective, LeafDirective } from 'mdast-util-directive';
import { remove } from 'unist-util-remove';
import { visit } from 'unist-util-visit';
import { t } from '../i18n/utils'; // Removed .ts extension

// Type for the custom h function return value
interface MdastHtmlNode extends Paragraph {
  data: {
    hName: string;
    hProperties: HastProperties;
  };
  children: PhrasingContent[];
}

// Options for the plugin
interface RemarkCollapseOptions {
  label?: string;
}

// Union type for the directive nodes this plugin handles
type CollapseDirectiveNode = ContainerDirective | LeafDirective;


function h(
  el: string,
  attrs: HastProperties = {},
  children: (PhrasingContent | MdastHtmlNode)[] = [] // Allow MdastHtmlNode as children
): MdastHtmlNode {
   // Process children: wrap strings in Text nodes, ensure PhrasingContent
   const processedChildren: PhrasingContent[] = children.flatMap(child => {
    if (typeof child === 'string') {
      return { type: 'text', value: child } as Text;
    }
    // This logic is tricky: an MdastHtmlNode is a Paragraph, which is FlowContent.
    // PhrasingContent is more restrictive. If an h() node is a child of another h() node,
    // it means a Paragraph is inside another Paragraph's children array for HAST generation.
    // For simple text or inline elements, this is fine.
    // The original code directly passes node.children (Content[]) to an h() call,
    // and also [{type: 'text', value: title}]
    return child as PhrasingContent; // Simplification, might need more robust handling
  });
  const { tagName, properties } = _h(el, attrs);
  return {
    type: 'paragraph', // Consistent with other plugins
    data: { hName: tagName, hProperties: properties },
    children: processedChildren,
  };
}

const remarkCollapse: Plugin<[RemarkCollapseOptions?], Node, Node> = (options?: RemarkCollapseOptions) => {
  const settings = {
    label: t('remark.open') || 'Open', // Default label
    ...options,
  };

  const transformer = (tree: Node) => {
    visit(tree, (node: Node, index?: number, parent?: Parent) => {
      if (
        node.type !== 'containerDirective' &&
        node.type !== 'leafDirective'
      ) {
        return;
      }
      const directiveNode = node as CollapseDirectiveNode; // Cast for name, attributes, children

      if (!parent || typeof index !== 'number') {
        return;
      }

      if (directiveNode.name !== 'collapse' && directiveNode.name !== 'details') {
        return;
      }

      let title: string = settings.label;

      // Remove the directiveLabel node and extract its text content for the summary title
      remove(directiveNode, (child: Node, childParent?: Parent) => {
        // Check if child is a Paragraph node with directiveLabel
        if (child.data && 'directiveLabel' in child.data && child.data.directiveLabel) {
           // Ensure child is Parent-like and has children, and first child is Text-like
          if ('children' in child && Array.isArray((child as Parent).children) && (child as Parent).children.length > 0) {
            const firstGrandChild = (child as Parent).children[0];
            if (firstGrandChild.type === 'text' && 'value' in firstGrandChild) {
              title = (firstGrandChild as Text).value;
            }
          }
          return true; // Remove this node
        }
        return false; // Keep other nodes
      });
      
      // The remaining children of the directiveNode will become the content of the <details>
      // These are Content[] from mdast, which might include block elements.
      // The `h` function expects PhrasingContent[] for its children if strictly typed.
      // This implies that the `div` wrapper for content might need to handle FlowContent,
      // or the `h` function needs to be more flexible or a different node type used.
      // For now, casting as any to match original behavior of passing Content[] through.
      const contentChildren = directiveNode.children as any[];


      const detailsNode = h(
        'details',
        { class: 'remark-collapse' } as HastProperties,
        [
          h('summary', { class: 'remark-collapse__summary' } as HastProperties, [
            { type: 'text', value: title } as Text,
          ]),
          // Pass the (potentially modified) children of the directive to the content div
          h('div', { class: 'remark-collapse__content' } as HastProperties, contentChildren),
        ]
      );

      parent.children[index] = detailsNode;
    });
  };

  return transformer; // Correctly return the transformer
};

export { remarkCollapse };
