import type { Options } from './types'

export const MODE_CHOICES = ['pull'] as const

export const DOCKER_HUB_REGISTRY = 'registry-1.docker.io'
export const DEFAULT_REFERENCE = 'latest'

export const DEFAULT_OPTIONS: Partial<Options> = {
  mode: 'pull',
  registry: DOCKER_HUB_REGISTRY,
  reference: DEFAULT_REFERENCE,
}
