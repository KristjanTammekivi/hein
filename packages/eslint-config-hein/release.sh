cd "$(dirname "$0")"

if [ $# -eq 0 ]; then
  echo "Usage: $0 <patch|minor|major>"
  exit 1
fi

if [ $1 != "patch" -a $1 != "minor" -a $1 != "major" ]; then
  echo "Usage: $0 <patch|minor|major>"
  exit 1
fi

yarn version --$1 --no-git-tag-version
git add package.json
git commit -m "Release eslint-config-hein$(node -p "require('./package.json').version")"
TAG="eslint-config-hein$(node -p "require('./package.json').version")"
git tag -a $TAG -m "Release $TAG"
git push
git push origin $TAG