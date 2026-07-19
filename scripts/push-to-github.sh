#!/usr/bin/env bash
# Run this AFTER you create an empty GitHub repo and set:
#   export GH_TOKEN=ghp_your_token_here
#   export GITHUB_USER=your_github_username
#   export REPO_NAME=greenfield-street-scene   # optional
set -euo pipefail

if [[ -z "${GH_TOKEN:-}" || -z "${GITHUB_USER:-}" ]]; then
  echo "Set GH_TOKEN and GITHUB_USER first. See DEPLOY.md"
  exit 1
fi

REPO_NAME="${REPO_NAME:-greenfield-street-scene}"
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

echo "Creating repo if missing…"
curl -sS -X POST \
  -H "Authorization: Bearer $GH_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/user/repos \
  -d "{\"name\":\"$REPO_NAME\",\"private\":false,\"auto_init\":false}" \
  >/tmp/gh-create-repo.json || true

git remote remove origin 2>/dev/null || true
git remote add origin "https://x-access-token:${GH_TOKEN}@github.com/${GITHUB_USER}/${REPO_NAME}.git"

git push -u origin HEAD:main

echo ""
echo "Pushed to https://github.com/${GITHUB_USER}/${REPO_NAME}"
echo "Next: https://vercel.com/new — import that repo and Deploy."
