import 'server-only'

import { createHmac, randomUUID } from 'node:crypto'

type InternalApiRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  timeoutMs?: number
  headers?: Record<string, string>
}

export class InternalApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'InternalApiError'
    this.status = status
  }
}

function getConfig() {
  const baseUrl = process.env.INTERNAL_API_URL
  const sharedSecret = process.env.INTERNAL_API_SHARED_SECRET

  if (!baseUrl) {
    throw new Error('INTERNAL_API_URL nao configurada')
  }

  if (!sharedSecret) {
    throw new Error('INTERNAL_API_SHARED_SECRET nao configurada')
  }

  return { baseUrl, sharedSecret }
}

function ensurePath(path: string) {
  if (!path.startsWith('/')) {
    throw new Error(`Path da API invalido: ${path}`)
  }
  return path
}

function signPayload({
  sharedSecret,
  method,
  path,
  timestamp,
  nonce,
  rawBody,
}: {
  sharedSecret: string
  method: string
  path: string
  timestamp: string
  nonce: string
  rawBody: string
}) {
  const message = `${timestamp}.${nonce}.${method.toUpperCase()}.${path}.${rawBody}`
  return createHmac('sha256', sharedSecret).update(message).digest('hex')
}

async function parseApiResponse(response: Response) {
  const text = await response.text()

  if (!text) return null

  try {
    return JSON.parse(text)
  } catch {
    return { raw: text }
  }
}

export async function internalApiRequest<T>(
  rawPath: string,
  options: InternalApiRequestOptions = {}
): Promise<T> {
  const method = options.method ?? 'GET'
  const path = ensurePath(rawPath)
  const { baseUrl, sharedSecret } = getConfig()

  const rawBody = options.body === undefined ? '' : JSON.stringify(options.body)
  const timestamp = Date.now().toString()
  const nonce = randomUUID()
  const signature = signPayload({
    sharedSecret,
    method,
    path,
    timestamp,
    nonce,
    rawBody,
  })

  const controller = new AbortController()
  const timeoutMs = options.timeoutMs ?? Number(process.env.INTERNAL_API_TIMEOUT_MS ?? 12000)
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const targetUrl = new URL(path, baseUrl)

    const response = await fetch(targetUrl, {
      method,
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        'content-type': 'application/json',
        'x-timestamp': timestamp,
        'x-nonce': nonce,
        'x-signature': signature,
        ...options.headers,
      },
      body: rawBody ? rawBody : undefined,
    })

    const parsed = await parseApiResponse(response)

    if (!response.ok) {
      const message =
        typeof parsed === 'object' && parsed !== null && 'error' in parsed
          ? String(parsed.error)
          : `Erro da API interna (${response.status})`

      throw new InternalApiError(
        `${message} [${method.toUpperCase()} ${targetUrl.toString()}]`,
        response.status
      )
    }

    return parsed as T
  } catch (error) {
    if (error instanceof InternalApiError) {
      throw error
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new InternalApiError('Timeout ao chamar API interna', 504)
    }

    if (error instanceof Error) {
      throw new InternalApiError(
        `Falha ao chamar API interna [${method.toUpperCase()} ${path}]: ${error.message}`,
        502
      )
    }

    throw error
  } finally {
    clearTimeout(timeout)
  }
}
