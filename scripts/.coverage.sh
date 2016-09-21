#!/usr/bin/env bash
cat ../coverage/lcov.info | ../node_modules/coveralls/bin/coveralls.js
