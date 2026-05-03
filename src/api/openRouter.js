import { openRouterConfig } from '../config.js'

/**
 * Stream a chat completion from OpenRouter (OpenAI-compatible SSE).
 * @param {object} opts
 * @param {string} opts.apiKey
 * @param {string} opts.model
 * @param {{ role: string, content: string }[]} opts.messages
 * @param {(chunk: string) => void} opts.onDelta
 * @param {() => void} [opts.onDone]
 * @param {(err: Error) => void} [opts.onError]
 * @param {AbortSignal} [opts.signal]
 */
export function streamChatCompletion({
  apiKey,
  model,
  messages,
  onDelta,
  onDone,
  onError,
  signal,
}) {
  const run = async () => {
    const res = await fetch(openRouterConfig.baseUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer':
          typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173',
        'X-Title': 'HajjGPT · Hajj & Umrah',
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
      }),
      signal,
    })

    if (!res.ok) {
      const text = await res.text()
      let message = `Request failed (${res.status})`
      try {
        const j = JSON.parse(text)
        message = j.error?.message || j.message || message
      } catch {
        if (text) message = text.slice(0, 280)
      }
      throw new Error(message)
    }

    const reader = res.body?.getReader()
    if (!reader) {
      throw new Error('No response body')
    }

    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })

      let idx
      while ((idx = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, idx).trim()
        buffer = buffer.slice(idx + 1)
        if (!line.startsWith('data:')) continue
        const data = line.slice(5).trim()
        if (data === '[DONE]') {
          onDone?.()
          return
        }
        try {
          const json = JSON.parse(data)
          const piece = json.choices?.[0]?.delta?.content
          if (piece) onDelta(piece)
        } catch {
          // ignore malformed SSE fragments
        }
      }
    }

    onDone?.()
  }

  run().catch((e) => {
    if (e?.name === 'AbortError') return
    onError?.(e instanceof Error ? e : new Error(String(e)))
  })
}
