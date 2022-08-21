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
VERSION=$(node -p "require('./packages/$1/package.json').version")
yarn exec -- auto-changelog --tag-prefix $1@ --append-git-log '.packages/$1/' --output packages/$1/CHANGELOG.md -v $VERSION
git add packages/$1/package.json packages/$1/CHANGELOG.md
TAG="$1@$VERSION"
git commit -m "Release $TAG"
git tag -a $TAG -m "Release $TAG"
git push
git push origin $TAG