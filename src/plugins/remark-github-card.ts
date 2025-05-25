import { h as _h } from 'hastscript'; // s is not used
import type { Properties as HastProperties } from 'hast';
import type { Plugin } from 'unified';
import type { Node, Parent } from 'unist';
import type { Paragraph, Text, PhrasingContent } from 'mdast';
// Assuming mdast-util-directive exports this type.
import type { LeafDirective } from 'mdast-util-directive';
import { visit } from 'unist-util-visit';

// Type for the custom h function return value, same as other plugins
interface MdastHtmlNode extends Paragraph {
  data: {
    hName: string;
    hProperties: HastProperties;
  };
  children: PhrasingContent[];
}

// Type for the expected GitHub API response (subset)
interface GitHubRepoData {
  description: string | null;
  forks: number;
  watchers: number; // Or stargazers_count, depending on API version / preference
  owner: {
    avatar_url: string;
  };
  license: {
    spdx_id: string;
  } | null;
}

function h(
  el: string,
  attrs: HastProperties = {},
  children: (PhrasingContent | MdastHtmlNode)[] = [] // Allow MdastHtmlNode as children too
): MdastHtmlNode {
  // Filter out any potential undefined or null children, map strings to Text nodes
  const processedChildren: PhrasingContent[] = children.flatMap(child => {
    if (typeof child === 'string') {
      return { type: 'text', value: child } as Text;
    }
    // If it's already a valid PhrasingContent (like a Text node or our MdastHtmlNode which is a Paragraph)
    // we should ensure it fits PhrasingContent.
    // Since our MdastHtmlNode is a Paragraph, it's not strictly PhrasingContent.
    // This `h` function's children handling might need to be more nuanced
    // if we embed complex structures. For now, assuming simple text or other h() results.
    // The original code passes [{type: 'text', value: 'string'}] which is PhrasingContent.
    // And it passes results of other h() calls, which are MdastHtmlNode.
    // This means children of an h() call can be other h() calls, which is fine for structure,
    // but technically a Paragraph in a Paragraph is not standard mdast.
    // However, this structure is for hast output, so it might be fine.
    return child as PhrasingContent; // This is a simplification.
  });

  const { tagName, properties } = _h(el, attrs);
  return {
    type: 'paragraph', // Still unconventional, but consistent with other plugins
    data: { hName: tagName, hProperties: properties },
    children: processedChildren,
  };
}


const remarkGithubCard: Plugin<[], Node, Node> = () => {
  const transformer = (tree: Node) => {
    visit(tree, 'leafDirective', (node: LeafDirective, index?: number, parent?: Parent) => {
      if (!parent || typeof index !== 'number') {
        return;
      }
      if (node.name !== 'github') {
        return;
      }

      const repo = typeof node.attributes?.repo === 'string' ? node.attributes.repo : '';
      if (!repo || !repo.includes('/')) {
        // Create an error message node (or just return, or throw error)
        // The original code returned an h() call, which is a node.
        // This needs to be assigned to parent.children[index] if we want to replace the node.
        parent.children[index] = h(
          'div',
          { class: 'hidden remark-github-card-error' },
          [{ type: 'text', value: 'Invalid repository. ("repo" attribute must be in the format "owner/repo")' }],
        );
        return;
      }
      const [author, repoName] = repo.split('/', 2);

      const cardUuid = `GC${Math.random().toString(36).substring(2, 8)}`;

      const nAvatar = h(`img#${cardUuid}-avatar`, { class: 'github-avatar mr-4' });

      const nTitle = h('div', { class: 'flex items-center justify-between' }, [
        h('a', { class: 'flex items-center text-inherit text-xl', href: `https://github.com/${repo}`, target: '_blank' }, [
          nAvatar,
          h('div', {}, [{ type: 'text', value: author } as Text]),
          h('div', { class: 'mx-1' }, [{ type: 'text', value: '/' } as Text]),
          h('div', { class: 'font-bold break-all truncate' }, [{ type: 'text', value: repoName } as Text]),
        ]),
      ]);

      const nDescription = h(
        `div#${cardUuid}-description`,
        { class: 'my-2' },
        [{ type: 'text', value: 'Waiting for api.github.com...' } as Text]
      );

      const nStars = h('div', { class: 'flex items-center' }, [
        h('i', { class: 'ri-star-line' }),
        h(`div#${cardUuid}-stars`, { class: 'ml-1 mr-4' }, [{ type: 'text', value: 'Waiting' } as Text])
      ]);
      const nForks = h('div', { class: 'flex items-center' }, [
        h('i', { class: 'ri-git-fork-line' }),
        h(`div#${cardUuid}-forks`, { class: 'ml-1 mr-4' }, [{ type: 'text', value: 'Waiting' } as Text])
      ]);
      const nLicense = h('div', { class: 'flex items-center' }, [
        h('i', { class: 'ri-copyright-line' }),
        h(`div#${cardUuid}-license`, { class: 'ml-1 mr-4' }, [{ type: 'text', value: 'Waiting' } as Text])
      ]);

      // The embedded script. Content is a string.
      // We use the GitHubRepoData interface to guide the string's logic.
      const scriptValue = `
fetch('https://api.github.com/repos/${repo}', { referrerPolicy: "no-referrer" })
  .then(response => response.json())
  .then((data/*: GitHubRepoData*/) => { // Added comment for clarity
    const descEl = document.getElementById('${cardUuid}-description');
    if (descEl) {
      if (data.description) {
        descEl.innerText = data.description.replace(/:[a-zA-Z0-9_]+:/g, '');
      } else {
        descEl.innerText = "Description not set";
      }
    }
    const forksEl = document.getElementById('${cardUuid}-forks');
    if (forksEl) forksEl.innerText = String(data.forks || 0);
    const starsEl = document.getElementById('${cardUuid}-stars');
    if (starsEl) starsEl.innerText = String(data.watchers || 0);
    
    const avatarEl = document.getElementById('${cardUuid}-avatar');
    if (avatarEl && data.owner && data.owner.avatar_url) {
      avatarEl.setAttribute("src", data.owner.avatar_url);
    }
    
    const licenseEl = document.getElementById('${cardUuid}-license');
    if (licenseEl) {
      if (data.license?.spdx_id) {
        licenseEl.innerText = data.license.spdx_id;
      } else {
        licenseEl.innerText = "No License";
      }
    }
    
    const cardEl = document.getElementById('${cardUuid}-card');
    if (cardEl) cardEl.classList.remove("fetch-waiting");
    console.log("[GITHUB-CARD] Loaded card for ${repo} | ${cardUuid}.");
  })
  .catch(err => {
    const cardEl = document.getElementById('${cardUuid}-card');
    if (cardEl) cardEl.classList.add("fetch-error");
    console.warn("[GITHUB-CARD] (Error) Loading card for ${repo} | ${cardUuid}.", err);
  });`;

      const nScript = h(
        `script#${cardUuid}-script`,
        { type: 'text/javascript', defer: true } as HastProperties, // Added 'as' for type correctness
        [{ type: 'text', value: scriptValue } as Text] // This should be 'html' or 'text' depending on context
                                                       // For <script> tags, content is usually raw text.
                                                       // mdast 'script' type doesn't exist. 'html' type with script tag might be more appropriate
                                                       // but this h function creates Paragraphs.
                                                       // A simple Text node is most straightforward for this h()
      );
      
      // Ensure the replacement is a single node.
      const replacementNode = h(
        `div#${cardUuid}-card`,
        {
          class: 'shadow w-auto flex flex-col bg-skin-card p-4 my-4 rounded-lg fetch-waiting', // Added fetch-waiting
          // 'href', 'target', 'repo' are not standard attributes for a div,
          // consider data-* attributes or custom elements if these need to be machine-readable.
          // For now, keeping them as they were, but they might not have semantic meaning.
          'data-repo': repo, // Example of using data- attribute
        } as HastProperties,
        [
          nTitle,
          nDescription,
          h('div', { class: 'flex' }, [nStars, nForks, nLicense]),
          nScript // nScript is an MdastHtmlNode (Paragraph), which is unusual inside a div rendered via HAST
                  // This might need to be an 'html' node with <script>...</script> value.
                  // However, given the h() function, this is what it produces.
        ]
      );
      parent.children[index] = replacementNode;

    });
  };
  return transformer; // Correctly return the transformer
};

export { remarkGithubCard };
