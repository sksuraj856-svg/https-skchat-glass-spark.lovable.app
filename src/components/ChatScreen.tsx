import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { addMessage, setMessages, setLoading, setMessageLoading } from '../redux/chatSlice'
import { useLoadMessages } from '../hooks/useLoadMessages'
import { useSendMessage } from '../hooks/useSendMessage'
import type { Message, User } from '../types/chat'

export const ChatScreen: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { currentConversation, messages, currentUser, loading } = useSelector(
    (state: RootState) => state.chat
  )

  const [messageText, setMessageText] = useState('')
  const [selectedUser] = useState<User | null>(location.state?.user || null)
  const [isSending, setIsSending] = useState(false)

  const { loadMessages, loading: messagesLoading } = useLoadMessages(conversationId)
  const { sendMessage, loading: sendLoading } = useSendMessage()

  useEffect(() => {
    if (!conversationId) {
      navigate('/')
      return
    }

    const load = async () => {
      dispatch(setLoading(true))
      const msgs = await loadMessages()
      if (msgs) dispatch(setMessages(msgs))
      dispatch(setLoading(false))
    }

    load()
  }, [conversationId, dispatch, loadMessages, navigate])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageText.trim() || !conversationId || isSending) return

    try {
      setIsSending(true)
      dispatch(setMessageLoading(true))

      const message = await sendMessage({
        conversationId,
        senderId: currentUser?.id || '',
        content: messageText.trim(),
      })

      if (message) {
        dispatch(addMessage(message))
        setMessageText('')
      }
    } finally {
      setIsSending(false)
      dispatch(setMessageLoading(false))
    }
  }

  const otherUser = selectedUser || currentConversation?.participants?.find(p => p.id !== currentUser?.id)

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 backdrop-blur-xl">
      <div className="flex-shrink-0 p-4 border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors md:hidden"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 
                            flex items-center justify-center text-white font-semibold">
              {otherUser?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-semibold text-white">{otherUser?.name || 'Chat'}</h2>
              <p className="text-xs text-gray-400">
                {otherUser?.status === 'online' ? '● Online' : '● Offline'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col-reverse">
        {loading || messagesLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-400">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl backdrop-blur-xl border transition-all ${
                  msg.senderId === currentUser?.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-400/30'
                    : 'bg-white/10 border-white/20'
                }`}
              >
                <p className="text-white text-sm break-words">{msg.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex-shrink-0 p-4 border-t border-white/10 backdrop-blur-xl bg-white/5 sticky bottom-0">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message..."
            disabled={isSending || loading}
            className="flex-1 px-4 py-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 
                      text-white placeholder-gray-400 focus:outline-none focus:border-white/40 
                      focus:bg-white/15 transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!messageText.trim() || isSending || loading}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 
                      text-white font-semibold hover:from-blue-600 hover:to-purple-600 
                      disabled:opacity-50 transition-all"
          >
            {isSending || sendLoading ? (
              <span className="inline-block animate-spin">⏳</span>
            ) : (
              'Send'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
