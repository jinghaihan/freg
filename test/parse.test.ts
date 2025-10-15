import { expect, it } from 'vitest'
import { parseReference } from '../src/utils'

it('should parse reference', () => {
  expect(parseReference({ ref: 'linuxserver/libreoffice:version-25.2.5.2-r0' }))
    .toMatchInlineSnapshot(`
    {
      "reference": "version-25.2.5.2-r0",
      "registry": "registry-1.docker.io",
      "repository": "linuxserver/libreoffice",
    }
  `)

  expect(parseReference({ ref: 'python:3.12-alpine' }))
    .toMatchInlineSnapshot(`
      {
        "reference": "3.12-alpine",
        "registry": "registry-1.docker.io",
        "repository": "python",
      }
    `)
})
