import React from 'react'
import { motion } from 'framer-motion'

export const Button = React.forwardRef(({ className = '', children, variant = 'primary', size = 'md', ...props }, ref) => {
  const baseStyles = 'font-medium rounded-xl transition-all duration-200 font-sans font-medium inline-flex items-center justify-center'
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30',
    secondary: 'bg-gray-800/60 hover:bg-gray-700/60 text-white border border-gray-700/50 hover:border-gray-600/50',
    ghost: 'hover:bg-gray-800/50 text-white hover:text-white',
    danger: 'bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/20 hover:border-red-600/40',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <motion.button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
})

Button.displayName = 'Button'
