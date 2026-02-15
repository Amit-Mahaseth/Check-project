import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../ui/card'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Send, Paperclip } from 'lucide-react'
import { MessageBubble } from './MessageBubble'

export const ChatWindow = ({ messages = [], onSendMessage = () => {} }) => {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input)
      setInput('')
    }
  }

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <p className="text-lg font-semibold mb-2">No messages yet</p>
              <p className="text-sm">Start a conversation to begin</p>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <MessageBubble
              key={idx}
              message={msg.text}
              isUser={msg.isUser}
              timestamp={msg.timestamp}
            />
          ))
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-800/30 p-8 space-y-4 bg-gray-900/30">
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} size="md">
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex justify-start">
          <Button variant="ghost" size="sm">
            <Paperclip className="w-4 h-4 mr-2" />
            Attach File
          </Button>
        </div>
      </div>
    </Card>
  )
}
