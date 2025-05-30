#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Get version type (e.g., patch, minor or major)
version=$VERSION

# Validate version type
if [[ ! "$version" =~ ^(patch|minor|major)$ ]]; then
  echo "Error: Invalid version type. Must be one of: patch, minor, major"
  exit 1
fi

# Temporary workspace for cloning repositories
temp_dir="temp"
# Destination base directory for docs from each repo (real folder)
docs_apps_dir="docs/get-started"
# GitHub repository owner (user or organization)
repo_owner="$REPO_OWNER"
# Folder at each repositories
docs_dir="docs"

# List of repositories to sync
repos=(
  "bitcoin-crawler"
  "transport-sdk"
)

git config user.name "github-actions"
git config user.email "github-actions@github.com"

echo "Setting package versions to: $version"
npm version $version --no-git-tag-version --no-commit-hooks


# Read the new version from package.json
version_num=$(jq -r '.version' package.json)
echo "✨  New version is v$version_num"

# Configuration: folder paths and repository owner
echo "🔄  Syncing docs from repositories"

# Create workspace directories
mkdir -p "$temp_dir"

echo "Found ${#repos[@]} repos to sync"

for repo in "${repos[@]}"; do
  echo "→ Processing $repo"
  gh repo clone "$repo_owner/$repo" "$temp_dir/$repo"

  src_dir="$temp_dir/$repo/$docs_dir"
  target_dir="$docs_apps_dir/$repo"

  if [ -d "$src_dir" ]; then
    echo "Copying docs from $repo → $target_dir"
    # Ensure target directory exists
    if [ ! -d "$target_dir" ]; then
      mkdir -p "$target_dir"
    fi
    # Copy and overwrite existing files
    cp -r "$src_dir/"* "$target_dir/"
  else
    echo "No $docs_dir/ in $repo, skipping"
  fi
done

echo "✅  Docs sync completed"
rm -rf "$temp_dir"

# Commit all changes in a single commit (version bump, CHANGELOG, docs)
echo "🚀  Committing all changes"

# Stage changed files
git add package.json yarn.lock "$docs_apps_dir"

if git diff --cached --quiet; then
  echo "⚠️  No changes to commit, skipping"
else
  git commit -m "chore(release): v$version_num"
  git push origin HEAD

  echo "🏷️  Tagging v$version_num"
  git tag -a "v$version_num" -m "Release v$version_num"
  git push origin "v$version_num"
fi

echo "✅  Release prep completed for v$version_num"

