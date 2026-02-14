import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, Loader2, Copy, Check, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import ReactMarkdown from 'react-markdown'
import TextRoll from '../components/TextRoll'

const ChatPage = () => {
    const navigate = useNavigate()
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'agent',
            text: "Namaste! 🙏 I'm CodeSherpa, your AI pair programmer. How can I help you today?\n\nTry:\n- **'Namaste demo'** for Hindi explanation\n- **'Review demo'** for code review example\n- Or ask me anything about code!",
            timestamp: new Date().toLocaleTimeString()
        }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const [copiedId, setCopiedId] = useState(null)
    const ws = useRef(null)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

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

            if (data.type === 'status' && data.content === 'thinking') {
                setIsTyping(true)
            } else if (data.type === 'response') {
                setIsTyping(false)
                const agentResponse = data.content

                let textContent = ""

                if (typeof agentResponse === 'object') {
                    if (agentResponse.error) {
                        textContent = `⚠️ **Error:** ${agentResponse.error}`
                    } else if (agentResponse.reply) {
                        textContent = agentResponse.reply
                    } else if (agentResponse.summary) {
                        textContent = `## 📋 Code Review Results\n\n**Summary:** ${agentResponse.summary}\n\n**Quality Score:** ${agentResponse.quality_score}/10\n\n**Security Risk:** ${agentResponse.security_risk}\n\n### Findings:\n${agentResponse.findings.map((f, i) => `\n${i + 1}. **[${f.severity}]** ${f.file}:${f.line}\n   - **Issue:** ${f.issue}\n   - **Suggestion:** ${f.suggestion}\n   - **Fix:** \`${f.code_fix}\``).join('\n')}`
                    } else if (agentResponse.explanation) {
                        textContent = `## 💡 Code Explanation\n\n${agentResponse.explanation}\n\n### Key Concepts:\n${agentResponse.key_concepts.map(k => `- **${k.term}:** ${k.definition}`).join('\n')}\n\n### Analogy:\n> ${agentResponse.analogy}\n\n### Learning Steps:\n${agentResponse.learning_steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`
                    } else {
                        textContent = `\`\`\`json\n${JSON.stringify(agentResponse, null, 2)}\n\`\`\``
                    }
                } else {
                    textContent = agentResponse
                }

                const newMessage = {
                    id: Date.now(),
                    sender: 'agent',
                    text: textContent,
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
        if (!input.trim() || !isConnected) return

        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: input,
            timestamp: new Date().toLocaleTimeString()
        }
        setMessages(prev => [...prev, userMsg])

        if (ws.current && isConnected) {
            ws.current.send(JSON.stringify({
                message: input,
                session_id: "demo-session-1"
            }))
        }

        setInput('')
        setIsTyping(true)
    }

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/10"
            >
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <Home className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                                <TextRoll className="font-bold text-lg inline-block">
                                    CodeSherpa
                                </TextRoll>
                                <div className="flex items-center gap-2 text-xs">
                                    <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <span className="text-gray-400">{isConnected ? 'Online' : 'Offline'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                            AWS Bedrock
                        </span>
                        <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
                            Claude 3.5
                        </span>
                    </div>
                </div>
            </motion.header>

            {/* Chat Container */}
            <div className="pt-24 pb-32 px-4 max-w-5xl mx-auto">
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`mb-6 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                                <div className={`rounded-2xl p-4 ${
                                    msg.sender === 'user'
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                                        : 'glass-dark border border-white/10'
                                }`}>
                                    <div className="prose prose-invert max-w-none">
                                        <ReactMarkdown
                                            components={{
                                                code({ node, inline, className, children, ...props }) {
                                                    const match = /language-(\w+)/.exec(className || '')
                                                    return !inline && match ? (
                                                        <div className="relative group">
                                                            <SyntaxHighlighter
                                                                {...props}
                                                                style={vscDarkPlus}
                                                                language={match[1]}
                                                                PreTag="div"
                                                                className="rounded-lg !bg-slate-900"
                                                            >
                                                                {String(children).replace(/\n$/, '')}
                                                            </SyntaxHighlighter>
                                                            <button
                                                                onClick={() => copyToClipboard(String(children), msg.id)}
                                                                className="absolute top-2 right-2 p-2 bg-slate-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                {copiedId === msg.id ? (
                                                                    <Check className="w-4 h-4 text-green-400" />
                                                                ) : (
                                                                    <Copy className="w-4 h-4" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <code {...props} className="bg-slate-800 px-1 py-0.5 rounded text-sm">
                                                            {children}
                                                        </code>
                                                    )
                                                }
                                            }}
                                        >
                                            {msg.text}
                                        </ReactMarkdown>
                                    </div>
                                    <div className="text-xs text-gray-400 mt-2 text-right">
                                        {msg.timestamp}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start mb-6"
                    >
                        <div className="glass-dark border border-white/10 rounded-2xl p-4">
                            <div className="flex gap-2">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                    className="w-2 h-2 bg-blue-400 rounded-full"
                                />
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                    className="w-2 h-2 bg-purple-400 rounded-full"
                                />
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                    className="w-2 h-2 bg-pink-400 rounded-full"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-0 left-0 right-0 glass-dark border-t border-white/10 p-4"
            >
                <div className="max-w-5xl mx-auto flex gap-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Ask about code, request a review, or say 'Namaste'..."
                        disabled={!isConnected}
                        className="flex-1 bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors disabled:opacity-50"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || !isConnected}
                        className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isTyping ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </button>
                </div>
                <div className="max-w-5xl mx-auto mt-2 text-center text-xs text-gray-500">
                    Powered by AWS Bedrock & Claude Sonnet • Made for India 🇮🇳
                </div>
            </motion.div>
        </div>
    )
}

export default ChatPage
