import type { Options } from './types'
import process from 'node:process'
import * as p from '@clack/prompts'
import c from 'ansis'
import { DEFAULT_REFERENCE, DOCKER_HUB_REGISTRY } from './constants'

export function getPlatform() {
  return `${process.platform}/${process.arch}`
}

export function parseReference(options: Partial<Options> & { ref?: string } = {}) {
  let { registry = DOCKER_HUB_REGISTRY, repository = '', reference = DEFAULT_REFERENCE } = options

  const ref = options.ref || process.argv[3]
  if (!ref) {
    p.outro(c.red`No reference provided`)
    process.exit(1)
  }

  if (ref.includes('/')) {
    const parts = ref.split('/')
    if (parts[0].includes('.') || parts[0].includes(':')) {
      registry = parts.shift()!
    }
    repository = parts.join('/')
  }
  else {
    // If no '/' in ref, the entire ref is the repository part
    repository = ref
  }

  if (repository.includes('@'))
    [repository, reference] = repository.split('@')
  else if (repository.includes(':'))
    [repository, reference] = repository.split(':')

  return { registry, repository, reference }
}
