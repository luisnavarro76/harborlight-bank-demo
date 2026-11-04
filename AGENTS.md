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

## Project rules
- Dashboard UI lives in `src/components/dashboard/`, with all demo figures in `data.ts` — keeps fictional data swappable in one place.
- Money amounts render through `Money`/`Compact` in `privacy.tsx` — so the hide-balances toggle covers every figure.
