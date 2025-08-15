#!/usr/bin/env node

// Ran from root as prepublishOnly hook to replace __SDK_DEV_VERSION__ with the actual SDK version.
import fs from 'fs';

const sdkPackage = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const server = fs.readFileSync('./server.mjs', 'utf8');

if (!server.includes('__DEV_SDK_VERSION__')) {
  throw new Error('__DEV_SDK_VERSION__ not found in server.mjs. Please create a fresh build before publishing! You can do this by running: cd ../server && npm run build.');
}

fs.writeFileSync('./server.mjs', server.replace(/__DEV_SDK_VERSION__/g, sdkPackage.version));