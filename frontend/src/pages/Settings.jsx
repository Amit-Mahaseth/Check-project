import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Settings as SettingsIcon, Lock, Bell, LogOut } from 'lucide-react'

const Settings = () => {
  const [formData, setFormData] = React.useState({
    email: 'user@codesherpa.dev',
    name: 'John Doe',
    company: 'TechCorp',
    notifications: true,
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

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
        <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Settings</h1>
        <p className="text-gray-500 text-lg">Manage your account preferences</p>
      </motion.div>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/15 border border-blue-500/30">
                <SettingsIcon className="w-5 h-5 text-blue-400" />
              </div>
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-3">Full Name</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-3">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-3">Company</label>
              <Input
                type="text"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
              />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-500/30">
                <Lock className="w-5 h-5 text-amber-400" />
              </div>
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-3">Current Password</label>
              <Input type="password" placeholder="Enter current password" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-3">New Password</label>
              <Input type="password" placeholder="Enter new password" />
            </div>
            <Button>Update Password</Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/15 border border-purple-500/30">
                <Bell className="w-5 h-5 text-purple-400" />
              </div>
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-6 rounded-xl border border-gray-800/40 bg-gray-900/30 hover:border-gray-800/60 transition-colors">
              <div>
                <p className="text-white font-semibold">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive email updates on agent activity</p>
              </div>
              <input
                type="checkbox"
                checked={formData.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
                className="w-5 h-5 rounded cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="border-red-500/30 bg-red-500/5 hover:border-red-500/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/15 border border-red-500/30">
                <LogOut className="w-5 h-5 text-red-400" />
              </div>
              <span className="text-red-400">Danger Zone</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-400">Once you logout, you will need to sign in again to access your account.</p>
            <Button variant="danger" className="w-full sm:w-auto">Logout</Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default Settings
