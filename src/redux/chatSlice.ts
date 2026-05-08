import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ChatState, Conversation, Message, User } from '../types/chat';

const initialState: ChatState = {
  conversations: [],
  currentConversation: null,
  currentUser: null,
  selectedUser: null,
  messages: [],
  loading: false,
  error: null,
  messageLoading: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Set selected user from chat list
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },

    // Set current active conversation
    setCurrentConversation: (state, action: PayloadAction<Conversation | null>) => {
      state.currentConversation = action.payload;
    },

    // Set current logged-in user
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },

    // Set all conversations
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },

    // Set messages for current conversation
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },

    // Add single message to current conversation
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },

    // Update message read status
    markMessageAsRead: (state, action: PayloadAction<string>) => {
      const message = state.messages.find(m => m.id === action.payload);
      if (message) {
        message.isRead = true;
      }
    },

    // Clear current conversation
    clearCurrentConversation: (state) => {
      state.currentConversation = null;
      state.messages = [];
      state.selectedUser = null;
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set message loading state
    setMessageLoading: (state, action: PayloadAction<boolean>) => {
      state.messageLoading = action.payload;
    },

    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Update conversation unread count
    updateConversationUnreadCount: (state, action: PayloadAction<{ conversationId: string; count: number }>) => {
      const conversation = state.conversations.find(c => c.id === action.payload.conversationId);
      if (conversation) {
        conversation.unreadCount = action.payload.count;
      }
    },

    // Pin/unpin conversation
    toggleConversationPin: (state, action: PayloadAction<string>) => {
      const conversation = state.conversations.find(c => c.id === action.payload);
      if (conversation) {
        conversation.isPinned = !conversation.isPinned;
      }
    },
  },
});

export const {
  setSelectedUser,
  setCurrentConversation,
  setCurrentUser,
  setConversations,
  setMessages,
  addMessage,
  markMessageAsRead,
  clearCurrentConversation,
  setLoading,
  setMessageLoading,
  setError,
  clearError,
  updateConversationUnreadCount,
  toggleConversationPin,
} = chatSlice.actions;

export default chatSlice.reducer;
