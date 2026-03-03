# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Astro, featuring a blog, project showcase, resume page, and testimonials. The site is multilingual (English/Spanish) and optimized for performance with a perfect Lighthouse score.

**Tech Stack:** Astro 5.x, Tailwind CSS, TypeScript, MDX for blog content, Playwright for testing

**Deployment:** Vercel (primary), Netlify (backup), Cloudflare Workers (backup via wrangler)

## Essential Commands

### Development
```bash
yarn dev                    # Start dev server on http://localhost:5173
yarn build                  # Build for production
yarn preview                # Preview production build
```

### Code Quality
```bash
yarn format                 # Format code with Prettier (Astro, MD, JSON)
yarn lint                   # Lint JavaScript/TypeScript/Astro files
yarn lint:fix               # Auto-fix linting issues
yarn check                  # Run both lint and format check
```

### Testing
```bash
yarn test                   # Run Playwright tests (requires dev server running)
```

### Performance
```bash
yarn lighthouse             # Run Lighthouse on production site
yarn lighthouse:local       # Run Lighthouse on local dev server (port 4321)
```

### Deployment
```bash
yarn deploy:cloudflare      # Deploy to Cloudflare Workers
yarn preview:cloudflare     # Build and preview Cloudflare deployment locally
```

### Testimonials (Python Scripts)
```bash
yarn search                 # Search for testimonials on GitHub
yarn testimonios            # Fetch testimonials from GitHub URLs
```

## Architecture

### Content Collections

The site uses Astro Content Collections defined in `src/content/config.ts`:
- `blog` - Blog posts with frontmatter (title, description, pubDate, tags, lang, draft status)
- `projects` - Main portfolio projects
- `open-source` - Open source contributions
- `more-projects` - Additional projects
- `more-full-stack-projects` - Full stack projects
- `more-open-source` - Additional open source work

All project collections share the same schema: `inProgress`, `title`, `description`, `img_alt`, `link`, `backup_url`, `github_link`, `tags`, `image`.

### Internationalization (i18n)

- Bilingual support: English (default) and Spanish
- Configuration in `src/i18n/` directory
- Language-specific UI strings in `src/i18n/ui.ts`
- Language utilities in `src/i18n/utils.ts`
- Blog posts can specify `lang: 'en'` or `lang: 'es'` in frontmatter
- Spanish versions of pages are under `src/pages/es/`

### Custom Remark Plugins

The project includes custom MDX/Markdown plugins in `src/plugins/`:
- `remark-asides.ts` - Custom aside/callout blocks
- `remark-button.ts` - Button components in Markdown
- `remark-collapse.ts` - Collapsible sections
- `remark-github-card.ts` - GitHub repository cards (uses GitHub API)
- `remark-html.ts` - Custom HTML handling
- `remark-modified-time.mts` - Auto-generate last modified timestamps
- `reset-remark.ts` - Reset/normalize Markdown

Most plugins are commented out in `astro.config.mts` but can be enabled as needed.

### Path Aliases

Configured in `astro.config.mts` vite.resolve.alias:
- `@src` → `src/`
- `@components` → `src/components/`
- `@layouts` → `src/layouts/`
- `@assets` → `src/assets/`
- `@pages` → `src/pages/`
- `@styles` → `src/styles/`
- `@utils` → `src/utils/`
- `@lib` → `src/lib/`
- `@plugins` → `src/plugins/`
- `@i18n` → `src/i18n/`
- `@i18n/utils` → `src/i18n/utils.ts`

### Site Configuration

All site-wide constants are in `src/consts.ts`:
- Personal info (author, description, GitHub username)
- Navigation menus (home, resume, back buttons)
- Social links
- Skills list
- Current projects (`whatImDoing`)
- Resume data (projects, certifications, courses)
- API endpoints (GitHub API, skill icons)

### Data Files

Static data in `src/data/`:
- `testimonials.json` - Manual testimonials
- `testimonials_auto.json` - Auto-fetched testimonials
- `github_manual_testimonials.json` - GitHub testimonials
- `linkedin_testimonials.json` - LinkedIn testimonials
- `top-contributions.ts` - Featured open source contributions
- `pageMetadata.ts` - SEO metadata for pages

### Components Structure

- `src/components/` - Page sections (About, TopContributions)
- `src/components/ui/` - Reusable UI components
- `src/layouts/` - Page layouts

### GitHub Integration

The site fetches data from the GitHub API:
- Portfolio projects from GitHub repos
- GitHub stars count
- GitHub contribution cards (via remark plugin)
- Testimonials from GitHub comments/issues

**Important:** GitHub API calls should use `PUBLIC_GITHUB_TOKEN` environment variable for higher rate limits. Token must be prefixed with `PUBLIC_` because it's used in browser contexts.

### Python Testimonial Scripts

Two Python scripts in `scripts/`:
1. `searching_for_testimonials_on_github.py` - Searches GitHub for testimonials mentioning the author
2. `fetch_testimonials_from_github_urls.py` - Fetches testimonials from specific GitHub URLs in `testimonial_urls.txt`

## Development Notes

### Testing
- Playwright tests are in `tests/` directory
- Tests run against `http://localhost:3000/` by default (configured in `playwright.config.ts`)
- Multiple browser configs: Chromium, WebKit, Mobile Chrome, Mobile Safari, Microsoft Edge
- Run dev server before running tests

### Code Style
- Use Prettier for formatting (Astro, Markdown, JSON)
- ESLint for linting (JavaScript, TypeScript, Astro files)
- Yarn v4 is the package manager (specified in `package.json`)
- Node.js >= 20.3.0 required

### Environment Variables
Copy `.env.example` to `.env` and configure:
- `PUBLIC_GITHUB_TOKEN` - GitHub API token (must be PUBLIC_ prefixed)
- `NETLIFY_SITE_ID` - For Unlighthouse metrics
- `NETLIFY_AUTH_TOKEN` - For Unlighthouse metrics

### GitHub Actions
Automated workflows in `.github/workflows/`:
- `astro.yml` - Build and deploy
- `lighthouse.yml` - Lighthouse CI checks
- `unlighthouse.yml` - Unlighthouse performance scanning
- `prettier.yml` - Code formatting checks
- `spellcheck.yml` - Spell checking
- `auto-assign-issue.yml` - Auto-assign issues

## Common Tasks

### Adding a New Blog Post
1. Create a new `.mdx` or `.md` file in `src/content/blog/`
2. Include required frontmatter: `title`, `description`, `pubDate`, `tags`, `lang`
3. Optional: `draft: true` to hide from production, `heroImage`, `updatedDate`

### Adding a New Project
1. Create a new `.md` file in the appropriate collection directory:
   - `src/content/projects/` - Main projects
   - `src/content/open-source/` - Open source
   - `src/content/more-projects/` - Additional projects
2. Include required frontmatter: `inProgress`, `title`, `description`, `tags`
3. Optional: `link`, `github_link`, `image`, `img_alt`, `backup_url`

### Modifying Site Configuration
Edit `src/consts.ts` for:
- Personal information
- Navigation menus
- Social links
- Skills list
- Resume data

### Enabling Custom Remark Plugins
Uncomment desired plugins in `astro.config.mts` markdown.remarkPlugins array. Note that `remarkGithubCard` requires `PUBLIC_GITHUB_TOKEN` environment variable.
