import { h as _h } from 'hastscript'; // s is not used
import type { Properties as HastProperties } from 'hast';
import type { Plugin } from 'unified';
import type { Node, Parent } from 'unist';
import type { Paragraph, PhrasingContent, Content } from 'mdast';
// Assuming mdast-util-directive exports these types.
import type { ContainerDirective, LeafDirective, TextDirective } from 'mdast-util-directive';
import { visit } from 'unist-util-visit';

// Type for the custom h function return value, same as other plugins
interface MdastHtmlNode extends Paragraph {
  data: {
    hName: string;
    hProperties: HastProperties;
  };
  children: PhrasingContent[];
}

// Union type for the directive nodes this plugin handles
type DirectiveNode = ContainerDirective | LeafDirective | TextDirective;

function h(
  el: string,
  attrs: HastProperties = {},
  children: PhrasingContent[] = []
): MdastHtmlNode {
  const { tagName, properties } = _h(el, attrs);
  return {
    type: 'paragraph', // Still unconventional, but consistent
    data: { hName: tagName, hProperties: properties },
    children,
  };
}

const remarkButton: Plugin<[], Node, Node> = () => {
  const transformer = (tree: Node) => {
    visit(tree, (node: Node, index?: number, parent?: Parent) => {
      // Check if it's one of the directive types we care about
      if (
        node.type !== 'containerDirective' &&
        node.type !== 'leafDirective' &&
        node.type !== 'textDirective'
      ) {
        return;
      }
      // Now, cast to the DirectiveNode union type for name and attributes
      const directiveNode = node as DirectiveNode;

      if (!parent || typeof index !== 'number') {
        return;
      }

      if (directiveNode.name === 'btn' || directiveNode.name === 'button') {
        const attributes = (directiveNode.attributes || {}) as HastProperties;
        
        let processedChildren: PhrasingContent[] = [];
        if (directiveNode.children && Array.isArray(directiveNode.children)) {
          processedChildren = directiveNode.children.reduce((acc: PhrasingContent[], child: Content) => {
            // If a child is a paragraph, unwrap its children (PhrasingContent)
            // This is to flatten structures like :::button[:p[text]]::: into <a>text</a>
            if (child.type === 'paragraph') {
              acc.push(...child.children);
            } else if (child.type === 'text' || child.type === 'emphasis' || child.type === 'strong' || child.type === 'inlineCode' /* other phrasing types */) {
              // If the child itself is PhrasingContent, add it directly.
              acc.push(child as PhrasingContent);
            }
            // Other block content inside directives might be ignored or need specific handling
            return acc;
          }, []);
        }

        const newButtonNode = h(
          'a', // Create an anchor tag
          {
            class: 'bg-skin-card rounded p-2 font-medium hover:text-skin-active inline hover:text-skin-active', // Default classes
            style: 'text-decoration: none;', // Default style, removed color part as it was incomplete
            ...attributes, // Spread user-defined attributes (e.g., href, custom classes)
          },
          processedChildren
        );
        parent.children[index] = newButtonNode;
      }
    });
  };
  return transformer; // Correctly return the transformer
};

export { remarkButton };
