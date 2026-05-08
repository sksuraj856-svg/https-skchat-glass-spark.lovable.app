import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './redux/store'
import { ChatList } from './components/ChatList'
import { ChatScreen } from './components/ChatScreen'
import { dummyUsers } from './data/dummyUsers'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
          <Routes>
            <Route path="/" element={<ChatList users={dummyUsers} />} />
            <Route path="/chat/:conversationId" element={<ChatScreen />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
