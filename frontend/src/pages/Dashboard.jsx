import React from 'react'
import { motion } from 'framer-motion'
import { StatCard } from '../components/dashboard/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Activity, BarChart3, MessageSquare, Zap } from 'lucide-react'

const Dashboard = () => {
  const stats = [
    {
      icon: Zap,
      label: 'Active Agents',
      value: '12',
      change: '+2.5%',
      trend: 'up',
    },
    {
      icon: BarChart3,
      label: 'Total Projects',
      value: '48',
      change: '+8.2%',
      trend: 'up',
    },
    {
      icon: MessageSquare,
      label: 'Messages Today',
      value: '2.4K',
      change: '+12.1%',
      trend: 'up',
    },
    {
      icon: Activity,
      label: 'System Status',
      value: '99.8%',
      change: '↑ Optimal',
      trend: 'up',
    },
  ]

  const recentActivity = [
    { id: 1, title: 'Agent deployed', time: '2 hours ago', status: 'success' },
    { id: 2, title: 'Project created', time: '5 hours ago', status: 'success' },
    { id: 3, title: 'Database synced', time: '1 day ago', status: 'success' },
    { id: 4, title: 'API configured', time: '2 days ago', status: 'info' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Welcome to CodeSherpa</h1>
        <p className="text-gray-500 text-lg">Manage your agents, projects, and deployments efficiently</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
          >
            <StatCard
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              trend={stat.trend}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <motion.div
                  key={activity.id}
                  whileHover={{ x: 6 }}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-800/30 transition-colors border border-transparent hover:border-gray-800/40"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-2.5 h-2.5 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                    <span className="text-white font-medium">{activity.title}</span>
                  </div>
                  <span className="text-sm text-gray-600">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="cursor-pointer"
        >
          <Card className="h-full">
            <CardContent className="p-10 text-center flex items-center justify-center h-32">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Create New Agent</h3>
                <p className="text-gray-500 text-sm">Deploy a new AI agent to your project</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="cursor-pointer"
        >
          <Card className="h-full">
            <CardContent className="p-10 text-center flex items-center justify-center h-32">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">View Documentation</h3>
                <p className="text-gray-500 text-sm">Learn how to integrate CodeSherpa</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard
