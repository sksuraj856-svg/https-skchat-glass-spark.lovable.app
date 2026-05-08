export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  status: 'online' | 'offline' | 'away'
  lastSeen?: Date
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  timestamp: Date
  isRead: boolean
}

export interface Conversation {
  id: string
  participants: User[]
  lastMessage?: Message
  lastMessageTime?: Date
  createdAt: Date
  updatedAt: Date
  unreadCount: number
}

export interface ChatState {
  conversations: Conversation[]
  currentConversation: Conversation | null
  currentUser: User | null
  selectedUser: User | null
  messages: Message[]
  loading: boolean
  error: string | null
  messageLoading: boolean
}

export interface SendMessagePayload {
  conversationId: string
  senderId: string
  content: string
}
