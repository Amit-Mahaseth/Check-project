import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Bell, Menu, X, Circle } from 'lucide-react'
import { Input } from '../ui/Input'

export const Navbar = ({ title, onMenuClick, menuOpen }) => {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 right-0 left-0 md:left-64 h-20 bg-gray-950/60 backdrop-blur-xl border-b border-gray-800/30 z-30 flex items-center justify-between px-8"
    >
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-800/50 rounded-xl transition-all duration-200"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <h2 className="text-lg font-semibold text-white hidden sm:block tracking-tight">{title}</h2>
      </div>

      {/* Center section - Search */}
      <div className="flex-1 max-w-md mx-6 hidden sm:block">
        <motion.div
          animate={{ width: searchOpen ? '100%' : '100%' }}
          className="relative"
        >
          <Input
            type="text"
            placeholder="Search..."
            icon={Search}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
          />
        </motion.div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Status indicator */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900/50 border border-gray-800/40">
          <Circle className="w-2 h-2 fill-green-500 text-green-500" />
          <span className="text-xs text-gray-400">System Online</span>
        </div>

        {/* Notification */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 hover:bg-gray-800/50 rounded-xl transition-all duration-200"
        >
          <Bell className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </motion.button>

        {/* User Avatar */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
        >
          U
        </motion.button>
      </div>
    </motion.nav>
  )
}
