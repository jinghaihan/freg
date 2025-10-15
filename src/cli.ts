import type { CAC } from 'cac'
import type { Options, RangeMode } from './types'
import process from 'node:process'
import * as p from '@clack/prompts'
import c from 'ansis'
import { cac } from 'cac'
import pkgJson from '../package.json'
import { getToken } from './api'
import { resolveConfig } from './config'
import { MODE_CHOICES } from './constants'

try {
  const cli: CAC = cac(pkgJson.name)

  cli
    .command('[mode]', 'Download images from registries')
    .option('--registry <registry>', 'Registry to download images from', { default: 'registry-1.docker.io' })
    .option('--platform <platform>', 'Platform to download images for', { default: 'linux/amd64' })
    .action(async (mode: RangeMode, options: Partial<Options>) => {
      if (mode) {
        if (!MODE_CHOICES.includes(mode)) {
          console.error(`Invalid mode: ${mode}. Please use one of the following: ${MODE_CHOICES.join(', ')}`)
          process.exit(1)
        }
        options.mode = mode
      }

      p.intro(`${c.yellow`${pkgJson.name} `}${c.dim`v${pkgJson.version}`}`)
      const config = await resolveConfig(options)

      const token = await getToken(config)

      console.log(mode, config, token)
    })

  cli.help()
  cli.version(pkgJson.version)
  cli.parse()
}
catch (error) {
  console.error(error)
  process.exit(1)
}
