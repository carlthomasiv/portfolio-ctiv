#!/bin/zsh
export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
exec /opt/homebrew/bin/node node_modules/next/dist/bin/next dev
