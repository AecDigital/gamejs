#!/bin/bash
# Launches GameJs

GAMEJS_DIR="${0%/*}"
cd ${GAMEJS_DIR}

~/ringojs/bin/ringo ${GAMEJS_DIR}/app/main.js
