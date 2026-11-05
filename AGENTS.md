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
- Keep newsletter collection disabled until the email platform, double opt-in, welcome and unsubscribe are verified; the section and popup share one form to prevent divergent consent rules.
- Coordinate newsletter display with cookie-dialog visibility through a browser event; keep invitation dismissal in mounted React state so page navigation does not restart prompts.

- The homepage renders one live Doctoralia aggregate with a last-verified fallback; gate the prepared testimonial strip on explicit republication authorization because public availability is not consent.
- The blog parent renders Outlet for article matches and the list only for its own URL, so article links display the requested content.
- Keep one homepage presentation between the forest banner and online therapy; reuse shared area data and specialty cards to prevent divergent content across homepage and services.

<!--
Specialty areas (diabetes, Alzheimer) are summary cards on /servicios that link to a
dedicated detail route; the full "what the accompaniment can focus on" list belongs on
the detail page so the cards stay scannable. Why: one source of truth per specialty.
-->
