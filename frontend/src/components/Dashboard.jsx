import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, GitPullRequest, BookOpen, IndianRupee } from 'lucide-react'

const Dashboard = () => {
    // Mock data for demo
    const stats = [
        { label: "PRs Reviewed", value: "12", icon: GitPullRequest, color: "text-blue-400" },
        { label: "Learning Paths", value: "5", icon: BookOpen, color: "text-purple-400" },
        { label: "Bugs Prevented", value: "28", icon: Activity, color: "text-green-400" },
        { label: "Est. Savings", value: "₹45k", icon: IndianRupee, color: "text-yellow-400" },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full max-w-4xl">
            {stats.map((stat, idx) => (
                <div key={idx} className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col items-center justify-center hover:border-gray-600 transition cursor-default">
                    <stat.icon className={`w-8 h-8 ${stat.color} mb-2`} />
                    <h4 className="text-2xl font-bold text-white">{stat.value}</h4>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</p>
                </div>
            ))}
        </div>
    )
}

export default Dashboard
