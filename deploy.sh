#!/usr/bin/env bash
# Deploy script for web-text-game
# Usage: ./deploy.sh "Commit message"

set -euo pipefail

MSG=${1:-"Update game"}

# Stage everything
git add .

# Commit
git commit -m "$MSG"

# Push to main
git push origin main

# Ensure gh-pages matches main (for GitHub Pages deployment)
git branch -f gh-pages main
git push -u origin gh-pages --force

echo "✅ Deployed to GitHub Pages: https://algotradecc-stack.github.io/web-text-game/"
