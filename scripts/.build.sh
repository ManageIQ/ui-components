#!/usr/bin/env bash
yarn install
yarn run build-dev
yarn run test
yarn run gettext:extract
