import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Bot, Plus, Trash2, Edit } from 'lucide-react'
import { EmptyState } from '../components/common/EmptyState'

const Agents = () => {
  const [agents] = useState([
    { id: 1, name: 'Code Reviewer', status: 'active', tasks: 142, lastRun: '2 hours ago' },
    { id: 2, name: 'Documentation Bot', status: 'active', tasks: 89, lastRun: '1 hour ago' },
    { id: 3, name: 'Performance Analyzer', status: 'inactive', tasks: 56, lastRun: '3 days ago' },
  ])

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
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Agents</h1>
          <p className="text-gray-500 text-lg">Manage and monitor your AI agents</p>
        </div>
        <Button size="lg">
          <Plus className="w-5 h-5 mr-2" />
          New Agent
        </Button>
      </motion.div>

      {/* Agents List */}
      {agents.length > 0 ? (
        <motion.div
          className="grid gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-4 rounded-2xl bg-blue-500/15 border border-blue-500/30">
                        <Bot className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                        <p className="text-sm text-gray-500">Tasks completed: {agent.tasks}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <Badge variant={agent.status === 'active' ? 'success' : 'warning'}>
                          {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                        </Badge>
                        <p className="text-xs text-gray-600 mt-2">Last run: {agent.lastRun}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="danger" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyState
          icon={Bot}
          title="No agents yet"
          description="Create your first agent to get started"
          action={<Button>Create Agent</Button>}
        />
      )}
    </motion.div>
  )
}

export default Agents
