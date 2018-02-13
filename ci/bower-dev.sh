#!/bin/bash
set -x
HASH=$(git rev-parse HEAD)
yarn install
yarn run build
mv -f dist tmp
mv bower.json bower.json.tmp
git remote add upstream https://github.com/ManageIQ/ui-components.git
git fetch upstream
git checkout bower-dev
rm -rf dist
mv -f tmp dist
mv -f bower.json.tmp bower.json
git add -f dist/css/ui-components.css dist/css/ui-components.css.map
git add -f dist/js/ui-components.js dist/js/ui-components.js.map
git add -f bower.json
git status
git commit -m "Automated build from ${HASH}"
echo $?
git log -1 --stat
set +x
git push https://$GITHUB_AUTH@github.com/ManageIQ/ui-components.git bower-dev &> /dev/null
echo $?
echo "git push origin HEAD:bower-dev"
