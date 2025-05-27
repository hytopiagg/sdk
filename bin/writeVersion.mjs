#!/usr/bin/env node

// Ran from root as prepublishOnly hook to replace __SDK_DEV_VERSION__ with the actual SDK version.
import fs from 'fs';

const sdkPackage = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const bunServer = fs.readFileSync('./bun-server.mjs', 'utf8');
const nodeServer = fs.readFileSync('./node-server.mjs', 'utf8');

if (!bunServer.includes('__DEV_SDK_VERSION__')) {
  throw new Error('__DEV_SDK_VERSION__ not found in bun-server.mjs. Please create a fresh build before publishing! You can do this by running: cd ../server && bun run build.');
}

if (!nodeServer.includes('__DEV_SDK_VERSION__')) {
  throw new Error('__DEV_SDK_VERSION__ not found in node-server.mjs. Please create a fresh build before publishing! You can do this by running: cd ../server && bun run build.');
}

fs.writeFileSync('./bun-server.mjs', bunServer.replace(/__DEV_SDK_VERSION__/g, sdkPackage.version));
fs.writeFileSync('./node-server.mjs', nodeServer.replace(/__DEV_SDK_VERSION__/g, sdkPackage.version));