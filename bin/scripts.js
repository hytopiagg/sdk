#!/usr/bin/env node

const { execSync } = require('child_process');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Store command-line flags
const flags = {};

// Main function to handle command execution
(async () => {
  const command = process.argv[2];
  
  // Parse command-line flags
  parseCommandLineFlags();
  
  // Execute the appropriate command
  const commandHandlers = {
    'init': init,
    'init-mcp': initMcp,
    'package': packageProject
  };
  
  const handler = commandHandlers[command];
  if (handler) {
    handler();
  } else {
    displayAvailableCommands(command);
  }
})();

/**
 * Parses command-line flags in the format --flag value
 */
function parseCommandLineFlags() {
  for (let i = 3; i < process.argv.length; i += 2) {
    if (i % 2 === 1) { // Odd indices are flags
      const flag = process.argv[i].replace('--', '');
      const value = process.argv[i + 1];
      flags[flag] = value;
    }
  }
}

/**
 * Displays available commands when an unknown command is entered
 */
function displayAvailableCommands(command) {
  console.log('Unknown command: ' + command);
  console.log('Supported commands: init, init-mcp, package');
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
 * Init command
 * 
 * Initializes a new HYTOPIA project. Accepting an optional
 * project name as an argument.
 * 
 * @example
 * `bunx hytopia init my-project-name`
 */
function init() {
  const destDir = process.cwd();

  // Install dependencies
  installProjectDependencies();

  // Initialize project with latest HYTOPIA SDK
  console.log('🔧 Initializing project with latest HYTOPIA SDK...');
 
  if (flags.template) {
    initFromTemplate(destDir);
  } else {
    initFromBoilerplate(destDir);
  }

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
  execSync('bun init --yes');
  execSync('bun add hytopia@latest --force');
  execSync('bun add @hytopia.com/assets --force');
  execSync('bun pm trust mediasoup');
  execSync('bun pm trust sharp');
}

/**
 * Initializes a project from a template
 */
function initFromTemplate(destDir) {
  console.log(`🖨️  Initializing project with examples template "${flags.template}"...`);

  execSync('bun add @hytopia.com/examples@latest --force');

  const templateDir = path.join(destDir, 'node_modules', '@hytopia.com', 'examples', flags.template);

  if (!fs.existsSync(templateDir)) {
    console.error(`❌ Examples template ${flags.template} does not exist in the @hytopia.com/examples package, could not initialize project!`);
    console.error(`   Tried directory: ${templateDir}`);
    return;
  }

  fs.cpSync(templateDir, destDir, { recursive: true });
  execSync('bun install');
}

/**
 * Initializes a project from the default boilerplate
 */
function initFromBoilerplate(destDir) {
  console.log('🧑‍💻 Initializing project with boilerplate...');
  const srcDir = path.join(__dirname, '..', 'boilerplate');
  fs.cpSync(srcDir, destDir, { recursive: true });  
}

/**
 * Copies assets to the project directory
 */
function copyAssets(destDir) {
  fs.cpSync(
    path.join(destDir, 'node_modules', '@hytopia.com', 'assets'),
    path.join(destDir, 'assets'),
    { recursive: true, force: false }
  );
}

/**
 * Displays success message after project initialization
 */
function displayInitSuccessMessage() {
  logDivider();
  console.log('✅ HYTOPIA PROJECT INITIALIZED SUCCESSFULLY!');
  console.log(' ');
  console.log('💡 1. Start your development server with: bun --watch index.ts');
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
      console.log('❌ Invalid selection. Please run `bunx hytopia init-mcp` again and select a number between 1 and 4.');
      rl.close();
      return;
    }
    
    if ([1, 2, 3].includes(selection)) { logDivider(); }

    if (selection === 1 || selection === 3) {
      initEditorMcp('Cursor', 'cursor');
    }

    if (selection === 2 || selection === 3) {
      initEditorMcp('Claude Code', 'claude');
    }
    
    rl.close();
    
    if ([1, 2, 3].includes(selection)) {
      console.log('🎉 You\'re all set! Your HYTOPIA project is ready to use.');
      logDivider();
    }
  });
}

/**
 * Initializes MCP for a specific editor
 */
function initEditorMcp(editorName, editorFlag) {
  console.log(`🔧 Initializing HYTOPIA MCP for ${editorName}...`);
  execSync(`bunx topia-mcp@latest init ${editorFlag}`);
  console.log(`✅ ${editorName} MCP initialized successfully!`);
  logDivider();
}

/**
 * Package command
 * 
 * Creates a zip file of the project directory, excluding node_modules,
 * package-lock.json, bun.lock, and bun.lockb files.
 * 
 * @example
 * `bunx hytopia package`
 */
function packageProject() {
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

  // Make sure assets exist and the model optimizer has been ran
  const assetsDir = path.join(sourceDir, 'assets');
  let hasOptimizedDir = false;
  
  if (fs.existsSync(assetsDir)) {
    // Function to recursively check for .optimized directories
    const checkForOptimizedDir = (dir) => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const itemPath = path.join(dir, item);
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory()) {
          if (item === '.optimized') {
            hasOptimizedDir = true;
            return true;
          }
          
          // Check subdirectories
          if (checkForOptimizedDir(itemPath)) {
            return true;
          }
        }
      }
      
      return false;
    };
    
    checkForOptimizedDir(assetsDir);
    
    if (!hasOptimizedDir) {
      console.warn('❌ Error: No .optimized directories found in the assets folder.');
      console.warn('   Make sure your server has ran the optimizer for your models.');
      console.warn('   This can be done by running your server with: bun --watch index.ts');
      return;
    }
  } else {
    console.warn('❌ Error: No assets directory found in the project.');
    return;
  }
  
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
    'node_modules',
    'package-lock.json',
    'bun.lock',
    'bun.lockb',
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

/**
 * Prints a divider line for better console output readability
 */
function logDivider() {
  console.log('--------------------------------');
}