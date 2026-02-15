import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChatWindow } from '../components/chat/ChatWindow'

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', isUser: false, timestamp: '10:30 AM' },
    { text: 'Can you review my code?', isUser: true, timestamp: '10:31 AM' },
    { text: 'Of course! Please paste your code and I\'ll review it for you.', isUser: false, timestamp: '10:32 AM' },
  ])

  const handleSendMessage = (message) => {
    setMessages([
      ...messages,
      { text: message, isUser: true, timestamp: new Date().toLocaleTimeString() },
      {
        text: 'Thanks for your message! I\'m processing your request...',
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      },
    ])
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-[calc(100vh-8rem)]"
    >
      <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
    </motion.div>
  )
}

export default Chat
