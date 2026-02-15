# CodeSherpa Frontend - Developer Guide

## 🎯 Quick Start

### Access the Dashboard
1. Navigate to `http://localhost:5174/login`
2. Use demo credentials:
   - Email: `demo@codesherpa.dev`
   - Password: `demo123`
3. You'll be redirected to the dashboard

### File Structure Navigation
```
Frontend starts at: src/
Entry point: src/main.jsx
Main app: src/App.jsx
Layout wrapper: src/components/layout/MainLayout.jsx
```

---

## 📦 Using Components

### UI Components
All UI components are located in `src/components/ui/`

#### Card Component
```jsx
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

<Card variant="default" hover={true}>
  <CardHeader>
    <CardTitle>Your Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>
```

**Props:**
- `variant`: 'default' | 'elevated' | 'ghost'
- `hover`: boolean (default: true)
- `className`: additional Tailwind classes

#### Button Component
```jsx
import { Button } from '../components/ui/Button'

<Button variant="primary" size="md">
  Click me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- Standard HTML button props

#### Input Component
```jsx
import { Input } from '../components/ui/Input'
import { Search } from 'lucide-react'

<Input 
  type="text" 
  placeholder="Search..." 
  icon={Search}
/>
```

**Props:**
- `type`: HTML input type
- `icon`: Lucide React icon component
- Standard HTML input props

#### Badge Component
```jsx
import { Badge } from '../components/ui/Badge'

<Badge variant="success">Active</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="warning">Pending</Badge>
```

**Props:**
- `variant`: 'default' | 'success' | 'error' | 'warning' | 'info'

### Layout Components
All layout components are in `src/components/layout/`

The layout is already integrated into routes - use inside `<MainLayout>` nested routes automatically.

---

## 🔄 API Integration

### Using the Agent Service
```jsx
import { agentService } from '../services/agentService'

// Get all agents
const agents = await agentService.getAgents()

// Get single agent
const agent = await agentService.getAgent(agentId)

// Create agent
await agentService.createAgent({ name: 'MyAgent', ... })

// Run agent
await agentService.runAgent(agentId, { input: 'user input' })
```

### Using the Auth Service
```jsx
import { authService } from '../services/authService'

// Login
const result = await authService.login(email, password)

// Register
await authService.register(email, password, name)

// Get current user
const user = await authService.getCurrentUser()

// Update profile
await authService.updateProfile({ ... })
```

### Using the Auth Hook
```jsx
import { useAuth } from '../hooks/useAuth'

function MyComponent() {
  const { user, loading, isAuthenticated, login, logout } = useAuth()

  if (loading) return <LoadingSpinner />
  
  if (!isAuthenticated) return <Navigate to="/login" />
  
  return <div>Welcome, {user.name}!</div>
}
```

---

## 🎨 Tailwind Classes Reference

### Background Colors (Dark Theme)
```
bg-gray-950  # Main background (#030712)
bg-gray-900  # Secondary background (#0f172a)
bg-gray-800  # Cards and hover states
bg-gray-700  # Borders and dividers
```

### Text Colors
```
text-white        # Primary text
text-gray-400     # Secondary text
text-gray-500     # Muted text
text-blue-400     # Accent color
```

### Spacing Examples
```
p-4   # Padding: 1rem
p-6   # Padding: 1.5rem
gap-3 # Gap between items: 0.75rem
mb-4  # Margin bottom: 1rem
```

### Rounding
```
rounded-lg   # 0.5rem
rounded-xl   # 0.75rem
```

### Borders
```
border border-gray-800
border-l border-blue-600/30
```

---

## 🔐 Authentication Setup

### 1. Configure Auth Context
Edit `src/context/AuthContext.jsx` and update API calls to match your backend

### 2. Use Protected Routes
```jsx
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

function ProtectedPage() {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) return <LoadingSpinner />
  if (!isAuthenticated) return <Navigate to="/login" />
  
  return <YourContent />
}
```

### 3. Set API Base URL
Create `.env` file in frontend directory:
```
VITE_API_URL=http://localhost:8000/api
```

---

## 📝 Creating New Pages

### Step 1: Create Page Component
```jsx
// src/pages/MyPage.jsx
import React from 'react'
import { motion } from 'framer-motion'

const MyPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1>My Page</h1>
    </motion.div>
  )
}

export default MyPage
```

### Step 2: Add Route
Edit `src/App.jsx`:
```jsx
import MyPage from './pages/MyPage'

// Add inside MainLayout routes
<Route path="/my-page" element={<MyPage />} />
```

### Step 3: Add to Sidebar
Edit `src/components/layout/Sidebar.jsx`:
```jsx
const menuItems = [
  // ... existing items
  { path: '/my-page', label: 'My Page', icon: YourIcon },
]
```

---

## 🎬 Animations with Framer Motion

### Basic Animation
```jsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### Hover Animation
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Hover me
</motion.button>
```

### Staggered Children
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

---

## 🧪 Testing Components

### Component Usage Example
```jsx
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'

function TestPage() {
  return (
    <div className="space-y-6">
      {/* Test Card */}
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a test card</p>
        </CardContent>
      </Card>

      {/* Test Button */}
      <Button onClick={() => alert('Clicked!')}>
        Click Me
      </Button>

      {/* Test Badge */}
      <Badge variant="success">Success</Badge>
    </div>
  )
}

export default TestPage
```

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Environment Variables
Create `.env.production`:
```
VITE_API_URL=https://api.codesherpa.dev
```

---

## 📚 Resources

- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion
- **Lucide Icons**: https://lucide.dev
- **React Router**: https://reactrouter.com
- **Axios**: https://axios-http.com

---

## 🐛 Common Issues

### Issue: Components not showing styles
**Solution**: Make sure Tailwind CSS classes are used, not custom CSS

### Issue: Page not rendering
**Solution**: Check that component is exported and imported correctly in App.jsx

### Issue: API calls failing
**Solution**: Check VITE_API_URL env variable and ensure backend is running

### Issue: Animations not working
**Solution**: Ensure Framer Motion is imported and motion components are used

---

## 📞 Support

For questions or issues, refer to:
1. Component implementation in `src/components/`
2. Page examples in `src/pages/`
3. Service examples in `src/services/`

---

**Last Updated**: February 15, 2026  
**Version**: 1.0.0
