import { useState, useCallback } from 'react'
import type { Conversation } from '../types/chat'

export const useGetOrCreateConversation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getOrCreateConversation = useCallback(
    async (userId: string): Promise<Conversation | null> => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/conversations/or-create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ participantId: userId }),
        })

        if (!response.ok) throw new Error('Failed to create conversation')
        const conversation: Conversation = await response.json()
        return conversation
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        setError(message)
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { getOrCreateConversation, loading, error }
}
