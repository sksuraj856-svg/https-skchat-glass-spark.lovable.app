# SKChat - Glass Spark

A modern glassmorphism chat application built with React, Redux, TypeScript, and Tailwind CSS.

## Features

✅ Click user to open chat
✅ Dynamic conversation routes
✅ Auto-create conversations
✅ Load messages from database
✅ Send/receive messages
✅ Smooth animations
✅ Mobile responsive
✅ Glassmorphism UI
✅ Message input and send button
✅ User status indicators

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # React components
│   ├── ChatList.tsx      # User list
│   └── ChatScreen.tsx    # Chat interface
├── hooks/            # Custom React hooks
│   ├── useConversationManager.ts
│   ├── useLoadMessages.ts
│   └── useSendMessage.ts
├── redux/            # Redux store
│   ├── store.ts
│   └── chatSlice.ts
├── types/            # TypeScript types
│   └── chat.ts
├── data/             # Mock data
│   └── dummyUsers.ts
├── App.tsx           # Main component
├── main.tsx          # React entry point
└── index.css         # Global styles
```

## Technologies

- React 18
- Redux Toolkit
- React Router
- TypeScript
- Tailwind CSS
- Vite

## API Endpoints

The application expects the following API endpoints:

- `POST /api/conversations/or-create` - Create or fetch conversation
- `GET /api/conversations/{id}/messages` - Load messages
- `POST /api/conversations/{id}/messages` - Send message

## UI Design

- **Glassmorphism**: Backdrop blur effects with transparent backgrounds
- **Gradients**: Purple and blue color scheme
- **Animations**: Smooth fade-in and scale transitions
- **Responsive**: Mobile-first design with breakpoints

## License

MIT
