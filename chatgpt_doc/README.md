# Lookvi context package for Claude Code

Files:
- `CLAUDE.md` — short, actionable working rules for Claude Code; put at the **repository root**.
- `docs/PRODUCT_CONTEXT.md` — product vision, MVP boundaries, UI inventory, domain model, business rules, pending decisions; put under **docs/**.

## Use
1. Copy the files into the root of your Expo/React Native project, preserving their relative paths.
2. Open that project in VS Code and start Claude Code from the project root.
3. Prompt: **"Read CLAUDE.md and docs/PRODUCT_CONTEXT.md, inspect the codebase, and summarize the implemented features, missing Stitch screens and the next safe tasks. Do not change code yet."**
4. Then give Claude one narrow implementation task at a time, ideally with the corresponding Stitch export/reference.

## Notes
- The document is based on previously discussed product direction and the Stitch screenshots. It is not a claim that every screen or business behavior is implemented.
- Prices are illustrative; key unresolved product questions are labelled clearly.
- Maintain docs after new decisions to keep subsequent coding sessions aligned.

## Branding migration
- Official product: **Lookvi**; older **Glow** references refer to the same project.
- Keep the established screen layouts; update brand strings and project metadata, not unrelated source names.
