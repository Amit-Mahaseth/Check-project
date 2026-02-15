import React from 'react'
import { Search } from 'lucide-react'

export const Input = React.forwardRef(({ className = '', icon: Icon, ...props }, ref) => {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />}
      <input
        ref={ref}
        className={`w-full rounded-xl bg-gray-900/50 border border-gray-800/40 px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-transparent transition-all duration-200 ${
          Icon ? 'pl-12' : ''
        } ${className}`}
        {...props}
      />
    </div>
  )
})

Input.displayName = 'Input'
