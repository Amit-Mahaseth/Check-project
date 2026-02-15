import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { FolderOpen, Plus, Eye } from 'lucide-react'
import { EmptyState } from '../components/common/EmptyState'

const Projects = () => {
  const projects = [
    { id: 1, name: 'E-commerce Platform', status: 'active', agents: 5, lastUpdated: '2 hours ago' },
    { id: 2, name: 'AI Chatbot', status: 'active', agents: 3, lastUpdated: '1 day ago' },
    { id: 3, name: 'Data Pipeline', status: 'archived', agents: 2, lastUpdated: '1 week ago' },
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
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Projects</h1>
          <p className="text-gray-500 text-lg">Organize and manage your projects</p>
        </div>
        <Button size="lg">
          <Plus className="w-5 h-5 mr-2" />
          New Project
        </Button>
      </motion.div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{project.name}</CardTitle>
                      <p className="text-xs text-gray-600 mt-2">Updated {project.lastUpdated}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-blue-500/15 border border-blue-500/30">
                      <FolderOpen className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div>
                    <Badge variant={project.status === 'active' ? 'success' : 'warning'}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-6">{project.agents} agents deployed</p>
                  </div>
                  <Button variant="secondary" className="w-full mt-6">
                    <Eye className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyState
          icon={FolderOpen}
          title="No projects yet"
          description="Create your first project to get started"
          action={<Button>Create Project</Button>}
        />
      )}
    </motion.div>
  )
}

export default Projects
