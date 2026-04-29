import { cpSync, existsSync, mkdirSync, readFileSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'
import { createInterface } from 'readline'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkgRoot = resolve(__dirname, '..')

const SKILL_NAME = 'element-plus-formkit-generator'
const SKILL_SRC = join(pkgRoot, 'skills', SKILL_NAME, 'SKILL.md')

if (!existsSync(SKILL_SRC)) {
  console.error(`  ✘ Skill source file not found: ${SKILL_SRC}`)
  process.exit(1)
}

const AGENT_DIRS = [
  { dir: '.trae/skills', name: 'Trae' },
  { dir: '.cursor/skills', name: 'Cursor' },
  { dir: '.claude/skills', name: 'Claude Code' },
  { dir: '.github/skills', name: 'GitHub Copilot' }
]

function installSkill(targetDir, agentName) {
  const destDir = join(targetDir, SKILL_NAME)
  const destFile = join(destDir, 'SKILL.md')

  if (existsSync(destFile)) {
    const existing = readFileSync(destFile, 'utf-8')
    const incoming = readFileSync(SKILL_SRC, 'utf-8')
    if (existing === incoming) {
      console.log(`  ✓ ${agentName}: already up to date`)
      return 'uptodate'
    }
    console.log(`  → ${agentName}: updating ...`)
  } else {
    console.log(`  + ${agentName}: installing ...`)
  }

  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true })
  }

  cpSync(SKILL_SRC, destFile)
  console.log(`  ✓ ${agentName}: ${destDir}`)
  return 'installed'
}

function question(prompt) {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

async function run(cwd = process.cwd()) {
  console.log(`\n  🧩 element-plus-formkit - AI Skill Installer\n`)
  console.log(`  Select target editor:\n`)

  const detected = AGENT_DIRS.filter(
    ({ dir }) => existsSync(join(cwd, dir)) || existsSync(join(cwd, dir.replace('/skills', '')))
  )

  AGENT_DIRS.forEach(({ dir, name }, i) => {
    const isDetected = detected.some((d) => d.dir === dir)
    const hint = isDetected ? ' (detected)' : ''
    console.log(`    ${i + 1}. ${name}${hint}`)
  })

  console.log(`    0. All of the above\n`)

  const answer = await question(`  Enter choice [1-${AGENT_DIRS.length}, 0]: `)

  const num = parseInt(answer, 10)
  const all = num === 0
  const targets = all
    ? AGENT_DIRS
    : num >= 1 && num <= AGENT_DIRS.length
      ? [AGENT_DIRS[num - 1]]
      : []

  if (targets.length === 0) {
    console.log(`\n  ✘ Invalid choice. Aborted.\n`)
    process.exit(1)
  }

  console.log()

  let installed = 0
  let uptodate = 0

  for (const { dir, name } of targets) {
    const targetDir = join(cwd, dir)
    const result = installSkill(targetDir, name)
    if (result === 'installed') installed++
    else if (result === 'uptodate') uptodate++
  }

  const total = targets.length
  if (installed > 0 && uptodate > 0) {
    console.log(`\n  ✓ Done! ${installed} installed, ${uptodate} already up to date (total ${total}).\n`)
  } else if (installed > 0) {
    console.log(`\n  ✓ Done! ${installed} skill(s) installed.\n`)
  } else {
    console.log(`\n  ✓ All ${total} skill(s) already up to date.\n`)
  }
}

export { run as installSkill }
