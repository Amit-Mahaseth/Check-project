import React from 'react'
import { motion } from 'framer-motion'

export const Card = React.forwardRef(({ className = '', children, variant = 'default', hover = true, ...props }, ref) => {
  const baseStyles = 'rounded-2xl border border-gray-800/40 bg-gray-900/50 backdrop-blur-sm transition-all duration-300'
  const hoverStyles = hover ? 'hover:border-gray-700/60 hover:bg-gray-900/70 hover:shadow-lg hover:shadow-gray-950/50 hover:-translate-y-1' : ''
  const variants = {
    default: `${baseStyles} ${hoverStyles}`,
    elevated: `${baseStyles} shadow-lg shadow-gray-950/30 ${hoverStyles}`,
    ghost: 'rounded-2xl transition-all duration-300',
  }

  return (
    <motion.div
      ref={ref}
      className={`${variants[variant]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  )
})

Card.displayName = 'Card'

export function CardHeader({ className, ...props }) {
    return <div className={`flex flex-col space-y-2 p-8 ${className}`} {...props} />
}

export function CardTitle({ className, ...props }) {
    return <h3 className={`font-semibold leading-none tracking-tight text-white text-lg ${className}`} {...props} />
}

export function CardContent({ className, ...props }) {
    return <div className={`p-8 pt-0 ${className}`} {...props} />
}

export function CardFooter({ className, ...props }) {
    return <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
}
