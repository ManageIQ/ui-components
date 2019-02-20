#!/usr/bin/env bash
# must fail when test fails
set -e

yarn install
yarn run build-dev
yarn run test
yarn run gettext:extract
