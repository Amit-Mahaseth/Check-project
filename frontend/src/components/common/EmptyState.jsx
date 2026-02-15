import React from 'react'
import { motion } from 'framer-motion'
import { Database } from 'lucide-react'

export const EmptyState = ({ icon: Icon = Database, title = 'No data', description = 'Nothing to display yet', action }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6 p-6 rounded-2xl bg-gray-800/40 border border-gray-800/60">
        <Icon className="w-8 h-8 text-gray-600" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-500 text-center mb-8 max-w-sm">{description}</p>
      {action}
    </motion.div>
  )
}
