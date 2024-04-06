#!/usr/bin/env sh
pnpm build && cd dist && zip -9 "index.html.$(date +%Y%m%d_%H%M%S).zip" index.html
