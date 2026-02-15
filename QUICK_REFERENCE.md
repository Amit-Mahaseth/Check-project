# CodeSherpa Frontend - Quick Reference

## 🚀 Quick Start

```bash
cd frontend
npm install
npm run dev
# Visit: http://localhost:5174/
```

---

## 🗂️ File Structure

```
src/
├── App.jsx                 ← Main app with routing
├── components/
│   ├── layout/            ← Sidebar, Navbar, MainLayout
│   ├── ui/                ← Card, Button, Input, Badge
│   ├── dashboard/         ← StatCard
│   ├── chat/              ← ChatWindow, MessageBubble
│   └── common/            ← LoadingSpinner, EmptyState
├── pages/
│   ├── Dashboard.jsx      ← Stats & activity
│   ├── Agents.jsx         ← Agent management
│   ├── Chat.jsx           ← Chat interface
│   ├── Projects.jsx       ← Project management
│   ├── Settings.jsx       ← User settings
│   └── Login.jsx          ← Authentication
├── services/
│   ├── api.js             ← Axios config
│   ├── agentService.js    ← Agent APIs
│   └── authService.js     ← Auth APIs
├── context/
│   └── AuthContext.jsx    ← Auth provider
├── hooks/
│   └── useAuth.js         ← Auth hook
└── utils/
    └── constants.js       ← Constants
```

---

## 🎨 Color System

| Usage | Color | Class |
|-------|-------|-------|
| Background | Deep Gray | `bg-gray-950` |
| Cards | Secondary Gray | `bg-gray-900` |
| Border | Gray | `border-gray-800` |
| Text | White | `text-white` |
| Secondary Text | Gray | `text-gray-400` |
| Accent | Blue | `bg-blue-600` |
| Success | Green | `bg-green-500` |
| Error | Red | `bg-red-600` |

---

## 🧩 Component Usage

### Card
```jsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Button
```jsx
<Button variant="primary" size="md">
  Click
</Button>
```

### Input
```jsx
<Input type="text" placeholder="..." icon={Search} />
```

### Badge
```jsx
<Badge variant="success">Active</Badge>
```

---

## 🔗 Routes

| Route | Component | Protected |
|-------|-----------|-----------|
| `/` | HomePage | No |
| `/login` | Login | No |
| `/dashboard` | Dashboard | Yes |
| `/agents` | Agents | Yes |
| `/chat` | Chat | Yes |
| `/projects` | Projects | Yes |
| `/settings` | Settings | Yes |

---

## 🔐 Authentication

```jsx
import { useAuth } from '../hooks/useAuth'

function MyPage() {
  const { user, isAuthenticated, loading } = useAuth()
  
  if (loading) return <LoadingSpinner />
  if (!isAuthenticated) return <Navigate to="/login" />
  
  return <div>Hello {user.name}</div>
}
```

---

## 📡 API Calls

```jsx
import { agentService } from '../services/agentService'

// Get all agents
const agents = await agentService.getAgents()

// Create agent
await agentService.createAgent({ name: 'Bot' })

// Run agent
await agentService.runAgent(id, { input: 'text' })
```

---

## ✨ Animations

```jsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.05 }}
>
  Content
</motion.div>
```

---

## 🎬 Creating Page

1. Create `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`
3. Add sidebar menu in `src/components/layout/Sidebar.jsx`

---

## 📱 Responsive Classes

```
block md:hidden     ← Show on mobile, hide on desktop
hidden md:block     ← Hide on mobile, show on desktop
grid-cols-1 md:cols-2 ← 1 column mobile, 2 desktop
w-full md:w-1/2    ← Full width mobile, half desktop
```

---

## 🌙 Dark Theme

All colors predefined. Use:
- `bg-gray-950` (main background)
- `bg-gray-900` (cards)
- `border-gray-800` (borders)
- `text-white` (primary text)
- `text-gray-400` (secondary text)

---

## 📦 Dependencies

- **React 18.2** - UI framework
- **Vite 4.5** - Build tool
- **React Router 6.20** - Routing
- **Tailwind CSS 3.3** - Styling
- **Framer Motion 12.34** - Animations
- **Lucide React** - Icons
- **Axios 1.13** - API calls

---

## 🔧 Environment

Create `.env`:
```
VITE_API_URL=http://localhost:8000/api
```

---

## 📝 Useful Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code quality
npm run lint         # Run ESLint
```

---

## 💡 Pro Tips

1. **Use motion components** for animations instead of CSS
2. **Leverage useAuth hook** for protected routes
3. **Import from ui folder** for consistent styling
4. **Use Badge component** for status indicators
5. **Wrap pages in motion.div** with animate property
6. **Use Lucide icons** from lucide-react
7. **Follow BEM naming** for custom classes
8. **Keep components under 300 lines**

---

## 🐛 Debugging

```jsx
// Check auth state
const auth = useAuth()
console.log(auth)

// Check API response
try {
  const data = await agentService.getAgents()
  console.log(data)
} catch (error) {
  console.error(error)
}

// Check component rendering
console.log('Component mounted')
```

---

## 📚 Documentation

- **REFACTOR_COMPLETE.md** - Full overview
- **DEVELOPER_GUIDE.md** - Detailed guide
- **EXECUTIVE_SUMMARY.md** - Executive overview
- **This file** - Quick reference

---

## 🎯 Next Steps

1. Set backend API URL in `.env`
2. Implement actual authentication
3. Connect real data to pages
4. Add unit tests
5. Deploy to production

---

**Happy Coding!** 🚀

