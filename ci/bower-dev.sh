#!/bin/bash
set -x
HASH=$(git rev-parse HEAD)
yarn run build
mv -f dist tmp
mv bower.json bower.json.tmp
git remote add upstream https://github.com/ManageIQ/ui-components.git
git fetch upstream
git checkout bower-dev
mv -f tmp dist
mv -f bower.json.tmp bower.json
git add -f dist/css/ui-components.css dist/css/ui-components.css.map
git add -f dist/js/ui-components.js dist/js/ui-components.js.map
git add -f bower.json
git commit -m "Automated build from ${HASH}"
set +x
git push -f https://$GITHUB_AUTH@github.com/ManageIQ/ui-components.git bower-dev &> /dev/null
echo "git push origin HEAD:bower-dev"
