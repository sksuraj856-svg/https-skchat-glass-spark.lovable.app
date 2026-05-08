// User interface for chat participants
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date;
}

// Message interface for individual messages
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'audio' | 'file';
  timestamp: Date;
  isRead: boolean;
  editedAt?: Date;
}

// Conversation interface for chat threads
export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  lastMessageTime?: Date;
  createdAt: Date;
  updatedAt: Date;
  unreadCount: number;
  isPinned: boolean;
}

// Redux chat state interface
export interface ChatState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  currentUser: User | null;
  selectedUser: User | null;
  messages: Message[];
  loading: boolean;
  error: string | null;
  messageLoading: boolean;
}

// Message send payload
export interface SendMessagePayload {
  conversationId: string;
  senderId: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'audio' | 'file';
}

// Conversation create/fetch payload
export interface ConversationPayload {
  userId1: string;
  userId2: string;
}
