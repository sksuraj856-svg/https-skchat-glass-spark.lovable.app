import { useState } from 'react'
import type { Message, SendMessagePayload } from '../types/chat'

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = async (payload: SendMessagePayload): Promise<Message | null> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/conversations/${payload.conversationId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('Failed to send message')
      const message: Message = await response.json()
      return message
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading, error }
}
