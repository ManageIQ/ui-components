#!/usr/bin/env bash
cd "`dirname "$0"`"
cat ../coverage/lcov.info | ../node_modules/coveralls/bin/coveralls.js
