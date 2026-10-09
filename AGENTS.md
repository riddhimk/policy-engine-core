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

## RiskOps architecture
- Each analytical view has its own TanStack content route and metadata; a shared application shell owns navigation and the single main landmark.
- Supplied report metrics live in shared browser-safe modules; illustrative calculations are isolated from reported results because no fitted model or loan-level data was provided.
- RiskOps uses semantic neo-glass CSS tokens and shared display components so visual changes remain consistent across analytical views.
