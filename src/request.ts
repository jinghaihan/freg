import process from 'node:process'

export async function getProxyAgent() {
  const proxy = process.env.https_proxy || process.env.HTTPS_PROXY
    || process.env.http_proxy || process.env.HTTP_PROXY

  if (!proxy)
    return

  try {
    const { ProxyAgent } = await import('undici')
    return new ProxyAgent(proxy)
  }
  catch {}
}

export async function request<T = unknown>(input: string | URL | Request, options?: RequestInit) {
  const proxyAgent = await getProxyAgent()
  const res = await fetch(input, {
    ...options,
    ...(proxyAgent && { dispatcher: proxyAgent }),
  })
  return {
    ok: res.ok,
    data: await res.json() as T,
  }
}
