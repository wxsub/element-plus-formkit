#!/usr/bin/env node
import { installSkill } from './install-skill.mjs'

const args = process.argv.slice(2)
const command = args[0]

if (command === 'skill') {
  const cwd = args.find((_, i) => args[i - 1] === '--cwd') || process.cwd()
  installSkill(cwd)
} else {
  console.log(`\n  element-plus-formkit CLI\n`)
  console.log(`  Usage:`)
  console.log(`    npx element-plus-formkit skill         Install AI coding skill\n`)
  console.log(`  Options:`)
  console.log(`    --cwd <path>                           Target project directory\n`)
}
