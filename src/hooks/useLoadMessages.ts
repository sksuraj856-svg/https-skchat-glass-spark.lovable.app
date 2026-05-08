import { useState, useCallback } from 'react'
import type { Message } from '../types/chat'

export const useLoadMessages = (conversationId?: string) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadMessages = useCallback(async (): Promise<Message[] | null> => {
    if (!conversationId) return null

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/conversations/${conversationId}/messages`)
      if (!response.ok) throw new Error('Failed to load messages')
      const messages: Message[] = await response.json()
      return messages
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(message)
      return null
    } finally {
      setLoading(false)
    }
  }, [conversationId])

  return { loadMessages, loading, error }
}
