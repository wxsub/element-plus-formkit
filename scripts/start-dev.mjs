#!/usr/bin/env node
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import chalk from 'chalk';
import ora from 'ora';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const log = {
  info: (msg) => console.log(chalk.blue(`ℹ ${msg}`)),
  success: (msg) => console.log(chalk.green(`✓ ${msg}`)),
  warning: (msg) => console.log(chalk.yellow(`⚠ ${msg}`)),
  error: (msg) => console.error(chalk.red(`✗ ${msg}`))
};

function returnToRoot() {
  try {
    process.chdir(rootDir);
    log.success('Exited');
  } catch (err) {
    log.error(`Exit abnormally: ${err.message}`);
  }
}

function startService(command, cwd) {
  return new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(' ');
    const service = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: true
    });
 
    service.on('spawn', () => {
      resolve(service);
    });
    
    service.on('error', (err) => {
      reject(err);
    });
    
    service.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Process exited with code ${code}`));
      } else {
        resolve(service);
      }
    });
  });
}

async function main() {
  try {
    process.on('SIGINT', () => {
      returnToRoot();
      process.exit(0);
    });

    const buildSpinner = ora('Building...').start();
    try {
      const service = await startService('pnpm build', rootDir);
      await new Promise((resolve) => service.on('close', resolve));
      buildSpinner.succeed('Build Success');
    } catch (error) {
      buildSpinner.fail(`Build Failed: ${error.message}`);
      return;
    }

    const packageDir = path.join(rootDir, '.packages');
    const packageSpinner = ora('Preparing product directory...').start();
    
    try {
      await fs.ensureDir(packageDir);
      await fs.emptyDir(packageDir);
      packageSpinner.succeed('Product directory ready');
    } catch (err) {
      packageSpinner.fail(`Product preparation failed: ${err.message}`);
      return;
    }

    const copyItems = [
      { src: path.join(rootDir, 'dist'), dest: path.join(packageDir, 'dist') },
      { src: path.join(rootDir, 'package.json'), dest: path.join(packageDir, 'package.json') },
      { src: path.join(rootDir, 'types'), dest: path.join(packageDir, 'types') }
    ];

    const copySpinner = ora('Copying files...').start();
    
    try {
      for (const item of copyItems) {
        if (await fs.pathExists(item.src)) {
          await fs.ensureDir(path.dirname(item.dest));
          await fs.copy(item.src, item.dest);
          copySpinner.info(`Copied: ${path.relative(rootDir, item.src)}`);
        } else {
          copySpinner.warn(`Skipped (not found): ${path.relative(rootDir, item.src)}`);
        }
      }
      copySpinner.succeed('Files copied successfully');
    } catch (err) {
      copySpinner.fail(`File copy failed: ${err.message}`);
      return;
    }

    const pagesDir = path.join(rootDir, 'pages');
    try {
      process.chdir(pagesDir);
      log.info(`Entered directory: ${pagesDir}`);
    } catch (err) {
      log.error(`Could not enter pages directory: ${err.message}`);
      return;
    }

    log.info('Starting VuePress documentation server...');
    console.log(chalk.dim('════════════════════════════════════════════════════'));
    
    const vuepressProcess = spawn('pnpm', ['docs:dev'], {
      cwd: pagesDir,
      stdio: 'inherit',
      shell: true
    });

    vuepressProcess.on('exit', (code) => {
      returnToRoot();
      if (code !== 0) {
        log.error(`Document server exited abnormally (code: ${code})`);
      }
    });

  } catch (err) {
    log.error(`Execution error: ${err.message}`);
    returnToRoot();
    process.exit(1);
  }
}

main();