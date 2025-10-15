import type { MODE_CHOICES } from './constants'

export type RangeMode = typeof MODE_CHOICES[number]

export interface CommandOptions {
  cwd?: string
}

export interface ConfigOptions {
  registry?: string
  platform?: string
}

export interface Options extends Required<CommandOptions>, Required<ConfigOptions> {
  mode: RangeMode
  repository: string
  reference: string
}

export interface ImageReference {
  registry: string
  repository: string
  reference: string
}

export interface TokenResponse {
  token: string
  expires_in: number
  issued_at: string
}
