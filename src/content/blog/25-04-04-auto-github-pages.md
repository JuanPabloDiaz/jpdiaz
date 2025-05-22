---
title: 'How Automation Transformed my Workflow'
description: 'Automate repetitive tasks and improve your productivity with tools like GitHub Actions.'
pubDate: 2025-04-04
lang: 'en'
tags:
  - Automation
  - GitHubActions
  - Productivity
draft: false
---

I automate to avoid errors. To avoid having to remember things that a machine can do for me. To free up mental space. And above all, so that my projects don't depend on whether I had a good day, whether I remembered to check something, or whether I had time to maintain them.

In this article, I share how automation has become an essential part of my workflow in projects like FreeForGeeks, Confs.tech, Public APIs, and my personal portfolio. From small tasks to complex AI-driven workflows, these tools have allowed me to work more efficiently and with greater peace of mind.

---

## Why I Started Automating

The first time I thought about automation wasn't because it was trendy or for productivity reasons. It was out of necessity.

In my early projects, everything was manual: tests, deployments, dependency maintenance. Even something as simple as updating the GitHub star count in my FreeForGeeks project required manual editing.

At first, these repetitive tasks didn't seem like a problem. But as my projects grew, the list of resources increased, and the number of projects I had to maintain multiplied. These small tasks began to consume an increasingly large portion of my time and attention.

The turning point came with FreeForGeeks, my curated collection of free tools and resources for developers. Each resource includes a link to its GitHub repository along with the number of stars. But there was a problem: the star count was hardcoded and became outdated almost immediately.

Inspired by a presentation by Tomer Shvueli at the AVLTechConnect meetup about automating boring tasks, I decided to build an automated solution instead of continuing to update this information manually.

I implemented a simple but effective system that:

- Scans the site to find all GitHub URLs
- Uses the GitHub API to get the actual number of stars
- Saves the data in `data/stars.json`
- Runs automatically with GitHub Actions

As I wrote on LinkedIn: **"It's not flashy. It's not complex. But it works — and it solves a real problem."**

## Tools and Technologies I Use for Automation

Following that first success, I began incorporating automation into different aspects of my projects. These are the main tools I currently use:

### GitHub Actions

The backbone of my automation strategy. I've implemented several workflows that have saved me countless hours:

- **Broken Link Verification**: In FreeForGeeks, a workflow periodically (monthly) scans and checks all links on the site with each push to the main branch. In a recent run, it checked 1188 links and detected 30 errors, which I was able to reduce to just 2.

- **Unlighthouse CI**: Automatically generates performance reports for my websites. As I shared: "I'm working on a project to generate and deploy performance reports for multiple websites using GitHub Actions, Unlighthouse CI, and Netlify." The results can be seen at https://status.jpdiaz.dev.

- **Prettier and Lint**: To maintain code consistency across all my projects without having to worry about formatting.

- **Dependabot**: Initially I used custom scripts to update dependencies, but then migrated to Dependabot for its ease of use and reliability.

### Custom Scripts

For specific tasks that require particular logic, I develop scripts in JavaScript or Python according to the project's needs.

### Complementary Tools

- **Lighthouse CI**: To consistently automate performance audits.
- **Copilot and CoderabbitAI**: While not pure automation, they help me review PRs and detect potential errors, saving me valuable time.

## How Automation Transformed My Workflow

Implementing these automations has profoundly changed my way of working:

### Frees Up Time and Attention

Tasks that previously required manual intervention now run automatically. This allows me to focus on creative and strategic aspects of development.

### Greater Consistency and Quality

Automated processes ensure that checks are performed uniformly each time, eliminating human variability. It doesn't matter if I'm tired or distracted — quality is maintained.

### Early Problem Detection

I receive immediate notifications about potential issues, allowing me to address them before they affect users. Instead of discovering a broken link months later, I know almost instantly.

### Improves Collaboration

GitHub Actions workflows facilitate contribution from other developers to the project. Contributors receive automatic feedback on their pull requests, accelerating the review cycle.

## A Framework for Identifying Automatable Tasks

Over time, I've developed a structured approach to identifying which tasks deserve to be automated:

1. **Frequency**: How often do you perform the task? If it's more than once a week, consider it for automation.

2. **Complexity vs Benefit**: Evaluate the effort needed to automate against the time you'll save. Is it worth automating?

3. **Error Proneness**: Tasks prone to human error are ideal candidates. Does it fail often if done by hand?

4. **Impact on Experience**: Prioritize automating tasks that directly improve user experience or code quality.

In FreeForGeeks, automatically updating the star count met all these criteria: it was a frequent task, prone to errors, relatively easy to automate, and added real value by showing updated information.

## Lessons Learned

My journey with automation has left me with several important lessons:

### Not Everything Deserves to Be Automated

Automating for the sake of automating makes no sense. Some tasks are so occasional or simple that the investment in automating them is not justified. Always evaluate the impact and frequency before investing time.

### Keep Your Automations Simple

Simple solutions are often more effective and sustainable. An overly complex automation can become another problem to maintain.

### Document Everything

Automation without documentation is difficult to maintain. A comment, a README, or a note can save you many hours when you need to review or modify something six months later.

### Test in Isolated Environments

Before implementing automation in production, test it thoroughly in a controlled environment. A poorly configured automation can cause more problems than it solves.

## Exploring the Future: Autonomous AI Agents

Beyond basic automations, I've begun exploring a more ambitious territory: autonomous AI agents. I'm building more complex workflows with:

- **n8n**: An open source automation platform with over 400 integrations.
- **Docker**: To run my agents locally and then easily migrate them to environments like DigitalOcean.
- **Ollama**: To run language models locally and create agents that reason, make decisions, and act without human intervention.
- **Embedded databases**: To provide agents with memory and context between executions.

It's still a project in development, running locally, but the experience has been fascinating. It's not yet a consolidated success story, but I can already glimpse the potential of these agents to take automation to a completely new level.

## Final Reflection: I Automate So I Don't Forget

Automating isn't just about productivity. It's about peace of mind.

I make my projects work for me, not the other way around. I automate to avoid forgetting things, to reduce errors, to free up mental space, and to make things simply... work.

Perhaps the most valuable thing I've learned is that automation allows me to be consistent even when I'm not at my best. My projects maintain their quality regardless of my mood or time availability.

## Conclusion

Automation has fundamentally transformed how I work. If you're starting with automation, I encourage you to:

1. **Identify a repetitive task** in your workflow that consumes significant time.
2. **Research tools** like GitHub Actions that could help you automate it.
3. **Start small** with a simple automation and build from there.
4. **Share your automations** with the community so others can benefit.

And if you've already implemented automations in your projects, what tasks have you automated and what impact has it had on your work? Do you have any tasks you could automate but don't know where to start? I'd love to hear about your experiences and learn from them. Write to me on [LinkedIn](https://linkedin.com/in/1diazdev)

Remember: automation isn't just about saving time; it's about freeing your mind for the creative and strategic work that really matters.
