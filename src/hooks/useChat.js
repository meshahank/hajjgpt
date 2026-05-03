import { useCallback, useEffect, useRef, useState } from 'react'
import { streamChatCompletion } from '../api/openRouter.js'
import { openRouterConfig } from '../config.js'
import { HAJJGPT_SYSTEM_PROMPT } from './systemPrompt.js'

function newId() {
  return crypto.randomUUID()
}

export function useChat() {
  const [messages, setMessages] = useState([])
  const messagesRef = useRef(messages)
  const [model, setModel] = useState(openRouterConfig.defaultModel)
  const [error, setError] = useState(null)
  const [inputError, setInputError] = useState(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const abortRef = useRef(null)
  const busyRef = useRef(false)

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  const clearError = useCallback(() => setError(null), [])

  const sendMessage = useCallback(
    (text) => {
      const trimmed = text.trim()
      setInputError(null)
      setError(null)

      if (busyRef.current) return

      if (!trimmed) {
        setInputError('Type your Hajj or Umrah question before sending.')
        return
      }

      if (!openRouterConfig.apiKey) {
        setError('Add VITE_OPENROUTER_API_KEY to `.env` before using OpenRouter.')
        return
      }

      busyRef.current = true
      const userMsg = { id: newId(), role: 'user', content: trimmed }
      const assistantId = newId()
      const assistantMsg = {
        id: assistantId,
        role: 'assistant',
        content: '',
        status: 'streaming',
      }

      const priorForApi = messagesRef.current
        .filter(
          (m) =>
            m.role === 'user' ||
            (m.role === 'assistant' && m.status !== 'streaming')
        )
        .map(({ role, content }) => ({ role, content }))

      const apiMessages = [
        { role: 'system', content: HAJJGPT_SYSTEM_PROMPT },
        ...priorForApi,
        { role: 'user', content: trimmed },
      ]

      setMessages((prev) => [...prev, userMsg, assistantMsg])
      setIsStreaming(true)

      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      streamChatCompletion({
        apiKey: openRouterConfig.apiKey,
        model,
        messages: apiMessages,
        signal: controller.signal,
        onDelta: (chunk) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: m.content + chunk }
                : m
            )
          )
        },
        onDone: () => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, status: 'complete' } : m
            )
          )
          setIsStreaming(false)
          busyRef.current = false
        },
        onError: (e) => {
          setError(e.message)
          setMessages((prev) => prev.filter((m) => m.id !== assistantId))
          setIsStreaming(false)
          busyRef.current = false
        },
      })
    },
    [model]
  )

  return {
    messages,
    model,
    setModel,
    error,
    inputError,
    isStreaming,
    sendMessage,
    clearError,
  }
}
