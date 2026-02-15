import React from 'react'

export const Badge = ({ className = '', children, variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-800/60 text-gray-300 border border-gray-700/40',
    success: 'bg-green-500/15 text-green-400 border border-green-500/40',
    warning: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/40',
    error: 'bg-red-500/15 text-red-400 border border-red-500/40',
    info: 'bg-blue-500/15 text-blue-400 border border-blue-500/40',
  }

  return (
    <span className={`inline-flex items-center rounded-xl px-3 py-1 text-xs font-semibold border transition-all duration-200 ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
