import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Bot,
  MessageSquare,
  FolderOpen,
  Settings,
  ChevronRight,
} from 'lucide-react'

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/agents', label: 'Agents', icon: Bot },
  { path: '/chat', label: 'Chat', icon: MessageSquare },
  { path: '/projects', label: 'Projects', icon: FolderOpen },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export const Sidebar = ({ open }) => {
  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={`${
        open ? 'block' : 'hidden'
      } fixed left-0 top-0 h-screen w-64 bg-gray-950/80 backdrop-blur-xl border-r border-gray-800/40 flex flex-col z-40 md:block md:relative md:translate-x-0`}
    >
      {/* Logo */}
      <div className="p-8 border-b border-gray-800/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-lg">CS</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg tracking-tight">CodeSherpa</h1>
            <p className="text-gray-500 text-xs">SaaS Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gray-800/60 text-white border border-gray-700/50'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/40 border border-transparent'
                }`
              }
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              <span className="font-medium text-sm flex-1">{item.label}</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </NavLink>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-8 border-t border-gray-800/30">
        <div className="text-center">
          <p className="text-xs text-gray-500 font-medium">v1.0.0</p>
          <p className="text-xs text-gray-600 mt-1">© 2026 CodeSherpa</p>
        </div>
      </div>
    </motion.aside>
  )
}
