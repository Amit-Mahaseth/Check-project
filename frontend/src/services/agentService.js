import api from './api'

export const agentService = {
  // Get all agents
  getAgents: () => api.get('/agents'),

  // Get single agent
  getAgent: (id) => api.get(`/agents/${id}`),

  // Create new agent
  createAgent: (data) => api.post('/agents', data),

  // Update agent
  updateAgent: (id, data) => api.put(`/agents/${id}`, data),

  // Delete agent
  deleteAgent: (id) => api.delete(`/agents/${id}`),

  // Run agent
  runAgent: (id, input) => api.post(`/agents/${id}/run`, { input }),

  // Get agent logs
  getAgentLogs: (id) => api.get(`/agents/${id}/logs`),

  // Batch run agents
  batchRun: (agentIds) => api.post('/agents/batch/run', { agentIds }),
}
