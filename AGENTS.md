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

- The homepage renders Doctoralia once, using the existing fetched reviews and original fallback list and profile URL; keep review data separate from its static presentation to preserve automatic updates.

<!--
Specialty areas (diabetes, Alzheimer) are summary cards on /servicios that link to a
dedicated detail route; the full "what the accompaniment can focus on" list belongs on
the detail page so the cards stay scannable. Why: one source of truth per specialty.
-->
