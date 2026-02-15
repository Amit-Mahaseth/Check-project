import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { MainLayout } from './components/layout/MainLayout'

// Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Agents from './pages/Agents'
import Chat from './pages/Chat'
import Projects from './pages/Projects'
import Settings from './pages/Settings'

// Old pages (preserved for backward compatibility)
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import FeaturesPage from './pages/FeaturesPage'

import './App.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Landing pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/legacy-chat" element={<ChatPage />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard routes with MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
