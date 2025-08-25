#!/usr/bin/env node

import { execSync, spawn } from 'child_process';
import archiver from 'archiver';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import * as esbuild from 'esbuild';

// Store command-line flags
const flags = {};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Main function to handle command execution
(async () => {
  const command = process.argv[2];
  
  // Check for version flags first (before parsing other flags)
  if (command === '-v' || command === '--version') {
    displayVersion();
    return;
  }
  
  // Help command/flags
  if (command === '-h' || command === '--help') {
    displayHelp();
    return;
  }
    
  // Parse command-line flags
  parseCommandLineFlags();
  
  // Execute the appropriate command
  const commandHandlers = {
    'build': build,
    'help': displayHelp,
    'init': init,
    'init-mcp': initMcp,
    'package': packageProject,
    'start': start,
    'upgrade-cli': () => upgradeCli(process.argv[3] || 'latest'),
    'upgrade-project': () => upgradeProject(process.argv[3] || 'latest'),
    'version': displayVersion,
  };
  
  const handler = commandHandlers[command];
  
  if (handler) {
    await Promise.resolve(handler());
  } else {
    displayAvailableCommands(command);
  }
})();

// ================================================================================
// COMMAND IMPLEMENTATIONS
// ================================================================================

/**
 * Build command
 * 
 * Builds the server and client code for node.js
 * 
 * @example
 */
async function build() {
  console.log('🔧 Building project...');

  await esbuild.build({
    entryPoints: ['index.ts'],
    outfile: './index.mjs',
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node24',
    sourcemap: 'inline',
    mainFields: ['module', 'main'],
    conditions: ['import', 'node'],
    banner: {
      js: 'import { createRequire as __cr } from "module"; import { fileURLToPath } from "url"; import { dirname as __bundlerDirname } from "path"; const require = __cr(import.meta.url); const __filename = fileURLToPath(import.meta.url); const __dirname = __bundlerDirname(__filename);'
    }
  });
}

/**
 * Runs a hytopia project's index file using node.js
 * and watches for changes.
 */
function start() {
  (async () => {
    let child = null;
    let restartTimer = null;

    const stopNode = () => {
      if (child && !child.killed) {
        try { child.kill(); } catch {}
      }
    };

    const restartNode = () => {
      stopNode();
      child = spawn(process.execPath, ['--enable-source-maps', 'index.mjs'], { stdio: 'inherit', shell: false });
    };

    const ctx = await esbuild.context({
      entryPoints: ['index.ts'],
      outfile: './index.mjs',
      bundle: true,
      format: 'esm',
      platform: 'node',
      target: 'node24',
      sourcemap: 'inline',
      external: [ 'mediasoup' ], // prevent pathing issues in dev env, prod sets the bin path so no issue bundling in prod build/package.
      mainFields: ['module', 'main'],
      conditions: ['import', 'node'],
      banner: {
        js: 'import { createRequire as __cr } from "module"; import { fileURLToPath } from "url"; import { dirname } from "path"; const require = __cr(import.meta.url); const __filename = fileURLToPath(import.meta.url); const __dirname = dirname(__filename);'
      },
      plugins: [{
        name: 'restart-after-build',
        setup(build) {
          build.onStart(() => {
            if (restartTimer) { clearTimeout(restartTimer); restartTimer = null; }
          });
          build.onEnd((result) => {
            if (result.errors?.length) return;
            restartTimer = setTimeout(restartNode, 150);
          });
        }
      }]
    });

    await ctx.watch();

    const cleanup = async () => {
      if (restartTimer) clearTimeout(restartTimer);
      stopNode();
      try { await ctx.dispose(); } catch {}
      process.exit(0);
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
  })();
}

/**
 * Version command
 * 
 * Displays the version of the HYTOPIA SDK by reading
 * from the package.json file.
 * 
 * @example
 * `hytopia version`
 * `hytopia -v`
 * `hytopia --version`
 */
function displayVersion() {
  const localVersion = getLocalVersion();

  if (localVersion) {
    console.log(localVersion);
  } else {
    console.error('❌ Error: Could not read package version');
    process.exit(1);
  }
}

/**
 * Init command
 * 
 * Initializes a new HYTOPIA project. Accepting an optional
 * project name as an argument.
 * 
 * @example
 * `hytopia init my-project-name`
 */
function init() {
  const destDir = process.cwd();

  console.log('⚙️ Installing core dependencies...');

  // Install dependencies
  installProjectDependencies();

  // Initialize project with latest HYTOPIA SDK
  console.log('🔧 Initializing project with latest HYTOPIA SDK...');
 
  if (flags.template) {
    initFromTemplate(destDir);
  } else {
    initFromBoilerplate(destDir);
  }

  // Update SDK to latest (sets package.json requirement)
  upgradeProject();

  // Copy assets into project, not overwriting existing files
  copyAssets(destDir);

  // Display success message
  displayInitSuccessMessage();

  // Prompt for MCP setup
  promptForMcpSetup();

  return;
}

/**
 * Installs required dependencies for a new project
 */
function installProjectDependencies() {
  // init project
  execSync('npm init -y --silent --loglevel silent', { stdio: ['ignore', 'ignore', 'inherit'] });

  // create tsconfig.json, used by build
  fs.writeFileSync('tsconfig.json', JSON.stringify({
    compilerOptions: {
      lib: ["ESNext"],
      target: "ESNext",
      module: "Preserve",
      moduleResolution: "node",
      verbatimModuleSyntax: true,
      strict: true,
      skipLibCheck: true
    }
  }, null, 2))

  // install hytopia sdk and hytopia assets
  execSync('npm install --force hytopia@latest @hytopia.com/assets@latest', { stdio: 'inherit' });
}

/**
 * Initializes a project from a template
 */
function initFromTemplate(destDir) {
  console.log(`🖨️  Initializing project with examples template "${flags.template}"...`);

  execSync('npm install --force @hytopia.com/examples@latest', { stdio: 'inherit' });

  const templateDir = path.join(destDir, 'node_modules', '@hytopia.com', 'examples', flags.template);

  if (!copyDirectoryContents(templateDir, destDir)) {
    console.error(`❌ Examples template ${flags.template} does not exist in the @hytopia.com/examples package, could not initialize project!`);
    console.error(`   Tried directory: ${templateDir}`);
    return;
  }

  execSync('npm install', { stdio: 'inherit' });
}

/**
 * Initializes a project from the default boilerplate
 */
function initFromBoilerplate(destDir) {
  console.log('🧑‍💻 Initializing project with boilerplate...');
  const srcDir = path.join(__dirname, '..', 'boilerplate');
  
  if (!copyDirectoryContents(srcDir, destDir)) {
    console.error('❌ Error: Could not copy boilerplate files');
    process.exit(1);
  }
}

/**
 * Copies assets to the project directory
 */
function copyAssets(destDir) {
  const assetsSource = path.join(destDir, 'node_modules', '@hytopia.com', 'assets');
  const assetsDest = path.join(destDir, 'assets');
  
  if (!copyDirectoryContents(assetsSource, assetsDest, { recursive: true, force: false })) {
    console.error('❌ Error: Could not copy assets from @hytopia.com/assets package');
  }
}

/**
 * Displays success message after project initialization
 */
function displayInitSuccessMessage() {
  logDivider();
  console.log('✅ HYTOPIA PROJECT INITIALIZED SUCCESSFULLY!');
  console.log(' ');
  console.log('💡 1. Start your development server by running the command `hytopia start`');
  console.log('🎮 2. Play your game by opening: https://hytopia.com/play/?join=localhost:8080');
  logDivider();
}

/**
 * Prompts the user to set up MCP
 */
function promptForMcpSetup() {
  console.log('📋 OPTIONAL: HYTOPIA MCP SETUP');
  console.log(' ');
  console.log('The HYTOPIA MCP enables Cursor and Claude Code editors to access');
  console.log('HYTOPIA-specific capabilities, providing significantly better AI');
  console.log('assistance and development experience for this HYTOPIA project.');
  console.log(' ');

  const rl = createReadlineInterface();
  
  rl.question('Would you like to initialize the HYTOPIA MCP for this project? (y/n): ', (answer) => {
    rl.close();

    if (answer.trim().toLowerCase() === 'y') {
      initMcp();
    } else {
      logDivider();
      console.log('🎉 You\'re all set! Your HYTOPIA project is ready to use.');
      console.log('You can start your project server by running the command: hytopia start');
      logDivider();
    }
  });
}

/**
 * Initializes the MCP for the selected editors
 */
function initMcp() {
  const rl = createReadlineInterface();

  logDivider();
  console.log('🤖 HYTOPIA MCP SETUP');
  console.log('Please select your code editor:');
  console.log('  1. Cursor');
  console.log('  2. Claude Code');
  console.log('  3. Both');
  console.log('  4. None / Cancel');

  rl.question('Enter your selection (1-4): ', (answer) => {
    const selection = parseInt(answer.trim());
    
    if (isNaN(selection) || selection < 1 || selection > 4) {
      console.log('❌ Invalid selection. Please run `hytopia init-mcp` again and select a number between 1 and 4.');
      rl.close();
      return;
    }
    
    if ([1, 2, 3].includes(selection)) { logDivider(); }

    if (selection === 1 || selection === 3) {
      initCursorLocalMcp();
    }

    if (selection === 2 || selection === 3) {
      initClaudeCodeMcp();
    }
    
    rl.close();
    
    if ([1, 2, 3].includes(selection)) {
      console.log('🎉 You\'re all set! Your HYTOPIA project is ready to use.');
      console.log('You can start your project server by running the command: hytopia start');
      logDivider();
    }
  });
}

function initClaudeCodeMcp() {
  console.log('🔧 Initializing HYTOPIA MCP for Claude Code...');
  try {
    execSync('claude mcp add hytopia-mcp -s project --transport http https://ai.hytopia.com/mcp', { stdio: 'inherit' });
  } catch (err) {
    console.log('⚠️ Could not add MCP via claude CLI, falling back to manual config...');
    const claudeDir = path.join(process.cwd(), '.claude');
    if (!fs.existsSync(claudeDir)) {
      fs.mkdirSync(claudeDir);
    }
    fs.writeFileSync(path.join(claudeDir, '.mcp.json'), JSON.stringify({
      mcpServers: {
        'hytopia-mcp': {
          url: 'https://ai.hytopia.com/mcp'
        }
      }
    }, null, 2));
  }
  console.log(`✅ Claude Code MCP initialized successfully!`);
  logDivider();
}

function initCursorLocalMcp() {
  console.log('🔧 Initializing HYTOPIA MCP for Cursor...');
  const cursorDir = path.join(process.cwd(), '.cursor');
  if (!fs.existsSync(cursorDir)) {
    fs.mkdirSync(cursorDir);
  }
  fs.writeFileSync(path.join(cursorDir, 'mcp.json'), JSON.stringify({
    mcpServers: {
      'hytopia-mcp': {
        url: 'https://ai.hytopia.com/mcp'
      }
    }
  }, null, 2));

  console.log(`✅ Cursor MCP initialized successfully!`);
  logDivider();
}

/**
 * Package command
 * 
 * Creates a zip file of the project directory, excluding node_modules
 * and package-lock.json files.
 * 
 * @example
 * `hytopia package`
 */
async function packageProject() {
  const sourceDir = process.cwd();
  const projectName = path.basename(sourceDir);
  const packageJsonPath = path.join(sourceDir, 'package.json');
  
  // Check if package.json exists
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ Error: package.json not found. This directory does not appear to be a HYTOPIA project.');
    console.error('   Please run this command in a valid HYTOPIA project directory.');
    return;
  }
  
  // Check if package.json contains "hytopia"
  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    if (!packageJsonContent.includes('hytopia')) {
      console.error('❌ Error: This directory does not appear to be a HYTOPIA project.');
      console.error('   The package.json file does not contain a reference to HYTOPIA.');
      return;
    }
  } catch (err) {
    console.error('❌ Error: Could not read package.json file:', err.message);
    return;
  }

  // Build the project
  await build();

  // Test server startup & make sure optimizer has ran
  console.log('🧪 Testing server startup and making sure optimizer has ran...');
  
  logDivider();
  
  const child = spawn(process.execPath, ['--enable-source-maps', 'index.mjs'], { stdio: 'pipe', shell: false });

  await new Promise(resolve => {
    child.stdout.on('data', data => {
      process.stdout.write(data);

      if (data.toString().includes('Server running')) {
        child.kill();
        resolve();
      }
    });
  });

  logDivider();

  // Prepare to package
  const outputFile = path.join(sourceDir, `${projectName}.zip`);
  
  console.log(`📦 Packaging project "${projectName}"...`);

  // Create a file to stream archive data to
  const output = fs.createWriteStream(outputFile);
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level
  });
  
  // Listen for all archive data to be written
  output.on('close', function() {
    console.log(`✅ Project packaged successfully! (${(archive.pointer() / 1024 / 1024).toFixed(2)} MB)`);
    console.log(`📁 Package saved to: ${outputFile}`);
  });
  
  // Good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      console.warn('⚠️ Warning:', err);
    } else {
      throw err;
    }
  });
  
  // Catch errors
  archive.on('error', function(err) {
    console.error('❌ Error during packaging:', err);
    throw err;
  });
  
  // Pipe archive data to the file
  archive.pipe(output);
  
  // Get all files and directories in the source directory
  const items = fs.readdirSync(sourceDir);
  
  // Files/directories to exclude
  const excludeItems = [
    '.git',
    'node_modules',
    'package-lock.json',
    `${projectName}.zip` // Exclude the output file itself
  ];
  
  // Add each item to the archive, excluding the ones in the exclude list
  items.forEach(item => {
    const itemPath = path.join(sourceDir, item);
    
    if (!excludeItems.includes(item)) {
      const stats = fs.statSync(itemPath);
      
      if (stats.isDirectory()) {
        archive.directory(itemPath, item);
      } else {
        archive.file(itemPath, { name: item });
      }
    }
  });
  
  // Finalize the archive
  archive.finalize();
}

// ================================================================================
// UTILITY FUNCTIONS
// ================================================================================

// set priority level for takahiro tickets

/**
 * Parses command-line flags in the format --flag value
 */
function parseCommandLineFlags() {
  for (let i = 3; i < process.argv.length; i += 2) {
    if (i % 2 === 1) { // Odd indices are flags
      let flag = process.argv[i].replace('--', '');
      let value = process.argv[i + 1];

      if (flag.includes('=')) {
        [ flag, value ] = flag.split('=');
      }

      flags[flag] = value;
    }
  }
}

/**
 * Copies directory contents (cross-platform compatible)
 */
function copyDirectoryContents(srcDir, destDir, options = { recursive: true }) {
  if (!fs.existsSync(srcDir)) return false;
  
  try {
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    const copyInto = (srcPath, destPath) => {
      const stat = fs.statSync(srcPath);
      if (stat.isDirectory()) {
        if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
        for (const entry of fs.readdirSync(srcPath)) {
          copyInto(path.join(srcPath, entry), path.join(destPath, entry));
        }
      } else {
        fs.cpSync(srcPath, destPath, { recursive: false, force: false });
      }
    };

    for (const item of fs.readdirSync(srcDir)) {
      copyInto(path.join(srcDir, item), path.join(destDir, item));
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Creates a readline interface for user input
 */
function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

/**
 * Prints a divider line for better console output readability
 */
function logDivider() {
  console.log('--------------------------------');
}

/**
 * Displays available commands when an unknown command is entered
 */
function displayAvailableCommands(command) {
  console.log('Unknown command: ' + command);
  console.log('');
  displayHelp();
}

// ================================================================================
// VERSION CHECK AND UPGRADE
// ================================================================================

function getLocalVersion() {
  try {
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return packageJson.version;
  } catch {
    return undefined;
  }
}

async function fetchLatestVersion(signal) {
  try {
    const res = await fetch('https://registry.npmjs.org/hytopia/latest', {
      headers: { 'Accept': 'application/vnd.npm.install-v1+json' },
      signal,
    });
    if (!res.ok) return undefined;
    const data = await res.json();
    return data?.version;
  } catch {
    return undefined;
  }
}

function upgradeCli(versionArg = 'latest') {
  const version = versionArg.trim();
  console.log(`🔄 Upgrading HYTOPIA CLI to: hytopia@${version} ...`);
  execSync(`npm install -g --force hytopia@${version}`, { stdio: 'inherit' });
  console.log('✅ Upgrade complete. You may need to restart your shell for changes to take effect.');
}

function upgradeProject(versionArg = 'latest') {
  const version = versionArg.trim();
  const spec = `hytopia@${version}`;
  console.log(`🔄 Upgrading project HYTOPIA SDK to: ${spec} ...`);
  execSync(`npm install --force ${spec}`, { stdio: 'inherit' });
  console.log('✅ Project dependency upgraded.');
}

// ==============================================================================
// HELP
// ==============================================================================

function displayHelp() {
  console.log('HYTOPIA CLI');
  console.log('');
  console.log('Usage:');
  console.log('  hytopia [command] [options]');
  console.log('');
  console.log('Commands:');
  console.log('  help, -h, --help            Show this help');
  console.log('  version, -v, --version      Show CLI version');
  console.log('  build                       Build the project (Generates ESM index.js)');
  console.log('  start                       Start a HYTOPIA project server (Node.js & watch)');
  console.log('  init [--template NAME]      Initialize a new project');
  console.log('  init-mcp                    Setup MCP integrations');
  console.log('  package                     Create a zip of the project for uploading to the HYTOPIA create portal.');
  console.log('  upgrade-cli                 Upgrade the HYTOPIA CLI');
  console.log('  upgrade-project [VERSION]   Upgrade project SDK dep (default: latest)');
  console.log('');
  console.log('Examples:');
  console.log('  hytopia init --template zombies-fps');
  console.log('  hytopia upgrade-project 0.8.12');
}