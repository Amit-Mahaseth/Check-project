import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../ui/card'
import { TrendingUp } from 'lucide-react'

export const StatCard = ({ icon: Icon, label, value, change, trend = 'up' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full">
        <CardContent className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">{label}</p>
              <h3 className="text-4xl font-bold text-white mb-4">{value}</h3>
              <div className="flex items-center gap-2">
                <TrendingUp className={`w-4 h-4 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`} />
                <span className={`text-sm font-semibold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {change}
                </span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-blue-500/15 border border-blue-500/30">
              <Icon className="w-7 h-7 text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
