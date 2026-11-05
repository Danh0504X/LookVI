# Lookvi — Context Pack v2 (for Claude Code)

Place the three files from `docs/` into your Lookvi project's `docs/` directory. **Do not replace the already generated root `CLAUDE.md`**; add the small reference block below to its end instead. Existing Expo configuration and the `ui/stitch_glow_beauty_app_ui/` exports remain unchanged.

Suggested addition to root `CLAUDE.md`:

```markdown
## Lookvi source-of-truth documents
Before proposing changes, read:
1. `docs/PRODUCT_CONTEXT.md` — purpose, confirmed business rules, proposed rules, open decisions.
2. `docs/DESIGN_DIRECTION.md` — Stitch-first visual/UX guidelines.
3. `docs/STITCH_INTEGRATION_PLAN.md` — current phase, source audit, staged execution.

The Stitch sources are located at `ui/stitch_glow_beauty_app_ui/` and are read-only references.
The current authorized phase is a **read-only audit and implementation plan only**.
Do not implement UI, add dependencies, change existing source, commit or push until explicitly requested.
```

After installing the context files, ask Claude Code to inspect the source files and produce the audit deliverable, without editing code.

Note: `PRODUCT_CONTEXT.md` includes both confirmed business rules and proposed/open decisions. The latter must not be treated as final requirements.
