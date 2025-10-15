import type { ImageReference, TokenResponse } from './types'
import process from 'node:process'
import * as p from '@clack/prompts'
import c from 'ansis'
import { request } from './request'

export async function getToken({ registry, repository }: ImageReference) {
  try {
    const spinner = p.spinner()
    spinner.start('Getting token...')

    const url = `https://${registry}/token?service=registry.docker.io&scope=repository:${repository}:pull`
    const { data, ok } = await request<TokenResponse>(url)
    spinner.stop()

    if (!ok) {
      p.outro(c.red`Failed to get token`)
      process.exit(1)
    }
    return data.token
  }
  catch (error) {
    p.outro(c.red`Failed to get token: ${error instanceof Error ? error.message : 'Unknown error'}`)
    process.exit(1)
  }
}
