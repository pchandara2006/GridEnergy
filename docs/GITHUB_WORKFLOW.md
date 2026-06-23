# GitHub Workflow

## Git Status
Check local changes before work:

```bash
git status --short --branch
```

## Git Add
Stage all intended changes:

```bash
git add .
```

For safer partial staging:

```bash
git add src docs GRIDREADY_CONTEXT.md TODO.md CHANGELOG.md package.json
```

## Git Commit
Commit with a clear product-focused message:

```bash
git commit -m "Build GridReady AI MVP frontend"
```

## Git Push
If a remote exists:

```bash
git push origin HEAD
```

If no remote exists, create a GitHub repo, then connect it:

```bash
git remote add origin git@github.com:YOUR_USERNAME/gridready-ai.git
git branch -M main
git push -u origin main
```

## Branch / Remote Notes
- This repository started with Git initialized but no commits and no remote.
- Use feature branches for larger future work, for example `codex/backend-scoring-api`.
- Never commit `.env` files or API keys.
