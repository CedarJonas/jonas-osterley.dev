# jonas-osterley.dev

Personal portfolio site. Astro, static output, no client-side JavaScript. Deployed on Netlify.

Built through Claude Code — the repo is public because the process is part of the portfolio. The commit history is the workflow.

## Structure

```
src/content/projects/     Major projects — index.md is the landing page,
                          sibling .md files are deep write-ups
src/content/writing/      Standalone essays
src/content/experiments/  Smaller builds, card format
src/lib/content.ts        Content queries (draft filtering, ordering)
src/pages/                Page templates
src/styles/global.css     Design system — palette, type scale, prose styles
```

Write-ups and essays with `draft: true` render in local dev but are excluded from production builds.

## Commands

```bash
npm install
npm run dev      # Local dev server
npm run build    # Production build
npm run check    # Type checking + content validation
```
