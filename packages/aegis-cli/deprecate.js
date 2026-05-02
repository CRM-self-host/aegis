#!/usr/bin/env node
const message = `\nAegis CLI (aegis-cli) is deprecated.\n\nPlease install and use the new package instead:\n  npm install -g aegis-sdk\n\nThe command name remains the same: \"aegis\".\nMore info: https://www.npmjs.com/package/aegis-sdk\n`;

console.error(message);
process.exitCode = 1;
