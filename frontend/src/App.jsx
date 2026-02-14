import React from 'react'
import ChatInterface from './components/ChatInterface'
import Dashboard from './components/Dashboard'

function App() {
    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-4 md:p-8 font-sans">
            <div className="text-center max-w-3xl mb-8">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                    CodeSherpa
                </h1>
                <p className="text-lg text-gray-400 mb-6 flex items-center justify-center gap-2">
                    Your AI Pair Programmer & Mentor <span className="text-2xl">🇮🇳</span>
                </p>
            </div>

            <Dashboard />

            <main className="w-full flex justify-center">
                <ChatInterface />
            </main>

        </div>
    )
}

export default App
