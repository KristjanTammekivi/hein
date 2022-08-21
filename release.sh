cd "$(dirname "$0")"

if [ -z "$1" ]; then
    echo "usage: $0 <package> <patch|minor|major>"
    exit 1
fi

if [ ! -d "packages/$1" ]; then
    echo "Error: $1 is not a valid package"
    exit 1
fi

if [ $# -eq 0 ]; then
  echo "Usage: $0 <patch|minor|major>"
  exit 1
fi

if [ $2 != "patch" -a $2 != "minor" -a $2 != "major" ]; then
  echo "Usage: $0 <patch|minor|major>"
  exit 1
fi

yarn --cwd packages/$1 version --$2 --no-git-tag-version
git add packages/$1/package.json
VERSION=$(node -p "require('./packages/$1/package.json').version")
TAG="$1@$VERSION"
echo git commit -m "Release $TAG"
echo git tag -a $TAG -m "Release $TAG"
echo git push
echo git push origin $TAG