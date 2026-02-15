import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'

const pageConfig = {
  '/dashboard': { title: 'Dashboard' },
  '/agents': { title: 'Agents' },
  '/chat': { title: 'Chat' },
  '/projects': { title: 'Projects' },
  '/settings': { title: 'Settings' },
}

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const config = pageConfig[location.pathname] || { title: 'Page' }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-950 to-gray-900 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar
          title={config.title}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          menuOpen={sidebarOpen}
        />

        {/* Content area */}
        <main className="flex-1 overflow-auto pt-20 pb-8">
          <div className="px-8 py-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
