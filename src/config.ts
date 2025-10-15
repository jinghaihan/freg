import type { CommandOptions, Options } from './types'
import process from 'node:process'
import { createConfigLoader } from 'unconfig'
import { DEFAULT_OPTIONS } from './constants'
import { getPlatform, parseReference } from './utils'

function normalizeConfig(options: Partial<Options>) {
  // interop
  if ('default' in options)
    options = options.default as Partial<Options>

  return options
}

export async function resolveConfig(options: CommandOptions): Promise<Options> {
  const defaults = structuredClone(DEFAULT_OPTIONS)
  options = normalizeConfig(options)

  const loader = createConfigLoader<Options>({
    sources: [
      {
        files: ['freg.config'],
        extensions: ['ts'],
      },
    ],
    cwd: options.cwd || process.cwd(),
    merge: false,
  })
  const config = await loader.load()
  const configOptions = config.sources.length ? normalizeConfig(config.config) : {}

  const merged = { ...defaults, ...configOptions, ...options }

  merged.cwd = merged.cwd ?? process.cwd()
  merged.platform = merged.platform ?? getPlatform()

  return { ...merged, ...parseReference(merged) } as Options
}
