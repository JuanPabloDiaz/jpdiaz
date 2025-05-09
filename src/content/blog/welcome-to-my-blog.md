---
title: 'Welcome to My Blog'
description: "This is my first blog post where I'll share my thoughts about web development and technology."
pubDate: 2025-05-05
lang: 'en'
tags: ['welcome', 'first-post', 'web-development']
draft: true
---

# Welcome to My Blog!

Hello everyone! I'm excited to start sharing my thoughts and experiences about web development, technology, and everything in between.

## What to Expect

In this blog, I'll be writing about:

- Web Development best practices
- New technologies and frameworks
- Personal projects and experiences
- Tips and tricks I've learned along the way

## Code Examples

Here's a simple example of how code blocks will look in the blog:

```javascript
function greet(name) {
	return `Hello, ${name}! Welcome to my blog.`;
}

console.log(greet('friend'));
```

## Stay Connected

Feel free to follow along and engage with the content. I'm looking forward to sharing and learning together!

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
