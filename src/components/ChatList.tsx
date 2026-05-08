import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSelectedUser, setCurrentConversation } from '../redux/chatSlice'
import { useGetOrCreateConversation } from '../hooks/useConversationManager'
import type { User } from '../types/chat'

interface ChatListProps {
  users: User[]
  loading?: boolean
}

export const ChatList: React.FC<ChatListProps> = ({ users, loading = false }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { getOrCreateConversation, loading: conversationLoading } = useGetOrCreateConversation()

  const handleUserClick = useCallback(
    async (user: User) => {
      try {
        dispatch(setSelectedUser(user))
        const conversation = await getOrCreateConversation(user.id)

        if (conversation) {
          dispatch(setCurrentConversation(conversation))
          navigate(`/chat/${conversation.id}`, {
            state: { user, conversationId: conversation.id },
          })
        }
      } catch (error) {
        console.error('Error opening chat:', error)
      }
    },
    [dispatch, navigate, getOrCreateConversation]
  )

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white" />
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="flex-shrink-0 p-4 border-b border-white/10 backdrop-blur-xl bg-white/5">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="text-sm text-gray-400">Your conversations</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {users.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>No users available</p>
          </div>
        ) : (
          <div className="space-y-2">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => handleUserClick(user)}
                disabled={conversationLoading}
                className="w-full p-3 rounded-xl backdrop-blur-xl bg-white/10 hover:bg-white/20 
                           border border-white/20 transition-all duration-300 transform hover:scale-102 
                           active:scale-98 disabled:opacity-50 focus:ring-2 focus:ring-white/30 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 
                                  flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">{user.name}</h3>
                    <p className="text-sm text-gray-300 truncate">
                      {user.status === 'online' && <span className="text-green-400">● Online</span>}
                      {user.status === 'away' && <span className="text-yellow-400">● Away</span>}
                      {user.status === 'offline' && <span className="text-gray-500">● Offline</span>}
                    </p>
                  </div>
                  {user.status === 'online' && (
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
