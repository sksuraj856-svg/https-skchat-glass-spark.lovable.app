import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ChatState, User, Conversation, Message } from '../types/chat'

const initialState: ChatState = {
  conversations: [],
  currentConversation: null,
  currentUser: null,
  selectedUser: null,
  messages: [],
  loading: false,
  error: null,
  messageLoading: false,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload
    },
    setCurrentConversation: (state, action: PayloadAction<Conversation | null>) => {
      state.currentConversation = action.payload
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload)
      if (state.currentConversation) {
        state.currentConversation.lastMessage = action.payload
        state.currentConversation.lastMessageTime = action.payload.timestamp
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setMessageLoading: (state, action: PayloadAction<boolean>) => {
      state.messageLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    clearCurrentConversation: (state) => {
      state.currentConversation = null
      state.messages = []
    },
  },
})

export const {
  setSelectedUser,
  setCurrentConversation,
  setCurrentUser,
  setConversations,
  setMessages,
  addMessage,
  setLoading,
  setMessageLoading,
  setError,
  clearCurrentConversation,
} = chatSlice.actions

export default chatSlice.reducer
