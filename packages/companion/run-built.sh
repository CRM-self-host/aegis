#!/bin/sh

set -e

echo "==> Packaging Aegis Desktop..."
SKIP_SIGN=1 npx electron-forge package

echo "==> Ad-hoc signing Aegis.app..."
codesign --force --deep --sign - out/Aegis-darwin-arm64/Aegis.app

echo "==> Starting local server..."
node src/server.js &
SERVER_PID=$!

trap "echo '==> Stopping server...'; kill $SERVER_PID 2>/dev/null" EXIT INT TERM

echo "==> Launching Aegis.app..."
./out/Aegis-darwin-arm64/Aegis.app/Contents/MacOS/Aegis
