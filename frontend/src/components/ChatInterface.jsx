import React, { useState, useEffect, useRef } from 'react'
import { Send, Upload, Mic, Loader2, Sparkles, MessageSquare, AlertCircle } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'agent',
            text: "Namaste! 🙏 I'm CodeSherpa. How can I help you today? I can review your PRs or explain code in Hindi/English.",
            timestamp: new Date().toLocaleTimeString()
        }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const ws = useRef(null)

    useEffect(() => {
        // Connect to WebSocket
        ws.current = new WebSocket('ws://localhost:8000/ws')

        ws.current.onopen = () => {
            console.log('Connected to CodeSherpa Backend')
            setIsConnected(true)
        }

        ws.current.onclose = () => {
            console.log('Disconnected')
            setIsConnected(false)
        }

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data)
            // data formats from backend
            // { "type": "status", "content": "thinking" }
            // { "type": "response", "content": { "reply": "...", "review": {...} } } or just raw string in early phase?
            // handling both simple structure for now

            if (data.type === 'status' && data.content === 'thinking') {
                setIsTyping(true)
            } else if (data.type === 'response') {
                setIsTyping(false)
                const agentResponse = data.content

                let textContent = ""
                let reviewData = null

                // If response is complex object (Review Monk)
                if (typeof agentResponse === 'object') {
                    if (agentResponse.error) {
                        textContent = `⚠️ **Error:** ${agentResponse.error}`
                    } else if (agentResponse.reply) {
                        textContent = agentResponse.reply
                    } else if (agentResponse.summary) {
                        // It's a review!
                        reviewData = agentResponse
                        textContent = `**Review Summary:**\n${agentResponse.summary}\n\n**Quality Score:** ${agentResponse.quality_score}/10`
                    } else if (agentResponse.explanation) {
                        // It's a sherpa explanation
                        textContent = `${agentResponse.explanation}\n\n**Key Concepts:**\n${agentResponse.key_concepts.map(k => `- ${k.term}: ${k.definition}`).join('\n')}\n\n**Analogy:**\n> ${agentResponse.analogy}`
                    } else {
                        // Fallback: If we don't recognize the object, show it as JSON
                        textContent = `\`\`\`json\n${JSON.stringify(agentResponse, null, 2)}\n\`\`\``
                    }
                } else {
                    // Simple string
                    textContent = agentResponse
                }

                const newMessage = {
                    id: Date.now(),
                    sender: 'agent',
                    text: textContent,
                    reviewData: reviewData, // Access for custom rendering if needed
                    timestamp: new Date().toLocaleTimeString()
                }
                setMessages(prev => [...prev, newMessage])
            }
        }

        return () => {
            if (ws.current) ws.current.close()
        }
    }, [])

    const sendMessage = () => {
        if (!input.trim()) return

        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: input,
            timestamp: new Date().toLocaleTimeString()
        }
        setMessages(prev => [...prev, userMsg])

        // Send to backend
        if (ws.current && isConnected) {
            ws.current.send(JSON.stringify({
                message: input,
                session_id: "demo-session-1" // generic session for now
            }))
        }

        setInput('')
        setIsTyping(true)
    }

    return (
        <div className="flex flex-col h-[600px] w-full max-w-4xl bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">CodeSherpa Assistant</h3>
                        <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            <p className="text-xs text-gray-400">{isConnected ? 'Online' : 'Disconnected'}</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full transition">Hindi Mode 🇮🇳</button>
                    <button className="text-xs bg-blue-600/20 text-blue-400 border border-blue-600/50 hover:bg-blue-600/30 px-3 py-1 rounded-full transition">AWS Bedrock Active</button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {messages.map((msg) => (
                    <div key={msg.id} className={cn("flex w-full", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                        <div className={cn(
                            "max-w-[80%] rounded-2xl p-4",
                            msg.sender === 'user'
                                ? "bg-blue-600 text-white rounded-br-none"
                                : "bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700"
                        )}>
                            <div className="markdown-content text-sm">
                                <ReactMarkdown
                                    components={{
                                        code({ node, inline, className, children, ...props }) {
                                            const match = /language-(\w+)/.exec(className || '')
                                            return !inline && match ? (
                                                <SyntaxHighlighter
                                                    {...props}
                                                    style={vscDarkPlus}
                                                    language={match[1]}
                                                    PreTag="div"
                                                >
                                                    {String(children).replace(/\n$/, '')}
                                                </SyntaxHighlighter>
                                            ) : (
                                                <code {...props} className={className}>
                                                    {children}
                                                </code>
                                            )
                                        }
                                    }}
                                >
                                    {msg.text}
                                </ReactMarkdown>
                            </div>
                            <span className="text-[10px] opacity-50 block text-right mt-2">{msg.timestamp}</span>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start w-full">
                        <div className="bg-gray-800 rounded-2xl p-4 rounded-bl-none border border-gray-700">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-gray-800 border-t border-gray-700">
                <div className="flex gap-2">
                    <button className="p-3 text-gray-400 hover:text-white bg-gray-700/50 rounded-lg transition hover:bg-gray-700">
                        <Mic size={20} />
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Ask about your code, paste a PR link, or say 'Namaste'..."
                        className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition placeholder:text-gray-500"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || !isConnected}
                        className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={20} />
                    </button>
                </div>
                <div className="text-center mt-2">
                    <p className="text-[10px] text-gray-500">Powered by AWS Bedrock & Claude Sonnet • Made for India 🇮🇳</p>
                </div>
            </div>
        </div>
    )
}

export default ChatInterface
