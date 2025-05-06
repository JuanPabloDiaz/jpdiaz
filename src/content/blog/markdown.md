---
title: 'Markdown Examples and Features'
description: 'A showcase of all the markdown features available in the blog'
pubDate: 2025-05-06
lang: 'en'
tags: ['markdown', 'features', 'guide']
draft: true
mathjax: true
mermaid: true
---

This post demonstrates all the features available in our blog posts.

## Basic Markdown

### Text Formatting

**Bold text** and _italic text_

### Lists

- Unordered list item 1
- Unordered list item 2
  - Nested item

1. Ordered list item 1
2. Ordered list item 2

### Links and Images

[Link to Google](https://google.com)

![Astro Logo](https://astro.build/assets/press/astro-logo-dark.svg)

## Code Examples

### Inline Code

Use `console.log()` for debugging.

### Code Blocks with Syntax Highlighting

```javascript
// This is a JavaScript example
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('World'));
```

```python
# This is a Python example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

### Collapsible Code Sections

```js collapsible="Click to see the code"
const complexCalculation = () => {
  let result = 0;
  for (let i = 0; i < 1000; i++) {
    result += Math.pow(i, 2);
  }
  return result;
};

console.log(complexCalculation());
```

## Advanced Features

### Admonitions

:::tip[Pro Tip]
You can use admonitions to highlight important information!
:::

:::note
This is a regular note.
:::

:::caution
Be careful with this section.
:::

:::danger
This is a dangerous operation!
:::

### Icons

You can use icons from Remix Icon:

<i class="ri-heart-fill text-xl text-red-500"></i>
<i class="ri-star-fill text-xl text-yellow-500"></i>
<i class="ri-github-fill text-xl"></i>

### Math Equations

Inline math: $ E = mc^2 $

Block math:
$$ \int\_{a}^{b} x^2 dx $$

### Mermaid Diagrams

```mermaid
sequenceDiagram
    participant Browser
    participant Server
    Browser->>Server: GET /page
    Server-->>Browser: HTML Content
    Browser->>Server: GET /style.css
    Server-->>Browser: CSS Content
    Browser->>Server: GET /script.js
    Server-->>Browser: JavaScript Content
```

### GitHub Card

::github{repo="withastro/astro"}

## Tables

| Feature           | Description                  | Status |
| ----------------- | ---------------------------- | ------ |
| Markdown          | Basic markdown support       | ✅     |
| Code Highlighting | Syntax highlighting for code | ✅     |
| Math              | LaTeX math equations         | ✅     |
| Diagrams          | Mermaid diagram support      | ✅     |

## Quotes

> This is a blockquote.
> It can span multiple lines.
>
> It can also have multiple paragraphs.

## Task Lists

- [x] Write the blog post
- [x] Add code examples
- [x] Include math equations
- [ ] Publish the post
