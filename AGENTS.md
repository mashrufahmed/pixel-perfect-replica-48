<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules

- ALL page copy lives in `src/data/portfolio.ts` (with content rules documented at the top). Components never hardcode copy; content changes happen there only.
- The portfolio is a single dark page; the design tokens in `src/styles.css` are the single dark theme (no light mode, no theme toggle). Breakpoints are remapped: `md` = 810px, `lg` = 1200px.
- Shared visual primitives (corner brackets, section tags, wipe buttons, rolling text) live in `src/components/portfolio/primitives.tsx` — reuse them instead of styling ad hoc.
- Tests in `src/test/portfolio-content.test.ts` enforce the hard content rules; keep them passing when editing `src/data/portfolio.ts`.
- The contact form has no backend: it logs the payload and shows a success state with a TODO marking where Supabase/email service connects.
