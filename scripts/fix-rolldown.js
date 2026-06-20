import { existsSync } from 'node:fs'
import { platform, arch } from 'node:process'
import { execSync } from 'node:child_process'

const bindingMap = {
  'linux:x64': '@rolldown/binding-linux-x64-gnu',
  'linux:arm64': '@rolldown/binding-linux-arm64-gnu',
  'linux:arm': '@rolldown/binding-linux-arm-gnueabihf',
  'darwin:x64': '@rolldown/binding-darwin-x64',
  'darwin:arm64': '@rolldown/binding-darwin-arm64',
  'win32:x64': '@rolldown/binding-win32-x64-msvc',
  'win32:arm64': '@rolldown/binding-win32-arm64-msvc',
}

const key = `${platform}:${arch}`
const pkg = bindingMap[key]

if (!pkg) {
  process.exit(0)
}

const targetPath = `node_modules/${pkg}`
if (existsSync(targetPath)) {
  process.exit(0)
}

try {
  execSync(`npm install --no-save ${pkg}`, { stdio: 'inherit' })
} catch (error) {
  console.error(`Failed to install optional binding ${pkg}.`, error)
  process.exit(1)
}
