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

const tailwindMap = {
  'linux:x64': '@tailwindcss/oxide-linux-x64-gnu',
  'linux:arm64': '@tailwindcss/oxide-linux-arm64-gnu',
  'linux:arm': '@tailwindcss/oxide-linux-arm-gnueabihf',
  'darwin:x64': '@tailwindcss/oxide-darwin-x64',
  'darwin:arm64': '@tailwindcss/oxide-darwin-arm64',
  'win32:x64': '@tailwindcss/oxide-win32-x64-msvc',
  'win32:arm64': '@tailwindcss/oxide-win32-arm64-msvc',
}

const key = `${platform}:${arch}`
const packages = []

if (bindingMap[key]) packages.push(bindingMap[key])
if (tailwindMap[key]) packages.push(tailwindMap[key])

if (packages.length === 0) {
  process.exit(0)
}

const missingPackages = packages.filter((pkg) => !existsSync(`node_modules/${pkg}`))
if (missingPackages.length === 0) {
  process.exit(0)
}

try {
  execSync(`npm install --no-save ${missingPackages.join(' ')}`, { stdio: 'inherit' })
} catch (error) {
  console.error(`Failed to install optional bindings: ${missingPackages.join(', ')}.`, error)
  process.exit(1)
}
