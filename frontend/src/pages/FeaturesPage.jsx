import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Code2, Brain, Shield, Zap, Globe, MessageSquare, Github, TrendingUp, Users, Award, Rocket } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TextRoll from '../components/TextRoll'

const FeaturesPage = () => {
    const navigate = useNavigate()

    const features = [
        {
            icon: <Brain className="w-12 h-12" />,
            title: "Multi-Agent Architecture",
            description: "Three specialized AI agents work together to provide comprehensive code assistance",
            details: [
                "Orchestrator Agent routes your requests intelligently",
                "Review Monk analyzes code for bugs and security",
                "Codebase Sherpa explains concepts and creates learning paths"
            ],
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Code2 className="w-12 h-12" />,
            title: "Smart Code Review",
            description: "Automated PR reviews with deep analysis and actionable feedback",
            details: [
                "Detects logic errors and potential runtime exceptions",
                "Identifies security vulnerabilities (OWASP Top 10)",
                "Provides code fix suggestions with examples",
                "Assigns quality scores and severity levels"
            ],
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: <Globe className="w-12 h-12" />,
            title: "Multilingual Support",
            description: "Explain complex code in Hindi, English, or Hinglish",
            details: [
                "Natural language explanations in your preferred language",
                "Culturally relevant analogies for better understanding",
                "Perfect for Indian developers at all skill levels",
                "Seamless language switching"
            ],
            color: "from-orange-500 to-red-500"
        },
        {
            icon: <Zap className="w-12 h-12" />,
            title: "Real-Time Communication",
            description: "Instant responses via WebSocket for seamless interaction",
            details: [
                "Sub-second response times",
                "Live typing indicators",
                "Persistent connection for continuous chat",
                "No page refreshes needed"
            ],
            color: "from-yellow-500 to-orange-500"
        },
        {
            icon: <Shield className="w-12 h-12" />,
            title: "Security First",
            description: "Comprehensive security analysis and AWS optimization",
            details: [
                "OWASP Top 10 vulnerability detection",
                "Timezone handling checks (IST vs UTC)",
                "AWS best practices recommendations",
                "Secure code patterns enforcement"
            ],
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: <MessageSquare className="w-12 h-12" />,
            title: "WhatsApp Integration",
            description: "Code on the go with mobile-first WhatsApp support",
            details: [
                "Review code from your phone",
                "Get instant notifications",
                "Perfect for India's mobile-first developers",
                "No app installation required"
            ],
            color: "from-teal-500 to-cyan-500"
        },
        {
            icon: <Github className="w-12 h-12" />,
            title: "GitHub Integration",
            description: "Seamless integration with your GitHub workflow",
            details: [
                "Automatic PR reviews via webhooks",
                "Post comments directly on GitHub",
                "Fetch diffs and analyze changes",
                "Works with public and private repos"
            ],
            color: "from-gray-500 to-slate-500"
        },
        {
            icon: <TrendingUp className="w-12 h-12" />,
            title: "Learning Paths",
            description: "Personalized learning journeys for skill development",
            details: [
                "Step-by-step guides for complex topics",
                "Key concept identification and definitions",
                "Progressive difficulty levels",
                "Track your learning progress"
            ],
            color: "from-indigo-500 to-purple-500"
        },
        {
            icon: <Award className="w-12 h-12" />,
            title: "Quality Metrics",
            description: "Track code quality and improvement over time",
            details: [
                "Quality scores for every review",
                "Bug prevention statistics",
                "Time saved calculations",
                "Team performance insights"
            ],
            color: "from-pink-500 to-rose-500"
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </button>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h1 className="text-6xl md:text-7xl font-black mb-6">
                            <TextRoll center className="gradient-text-blue inline-block">
                                Powerful Features
                            </TextRoll>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                            Everything you need to code faster, smarter, and with confidence. 
                            Built specifically for Indian developers.
                        </p>
                    </motion.div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="glass-dark rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 h-full">
                                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                    <p className="text-gray-400 mb-6">{feature.description}</p>
                                    <ul className="space-y-2">
                                        {feature.details.map((detail, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                                                <span className="text-blue-400 mt-1">•</span>
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="glass-dark rounded-3xl p-12 md:p-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-6">
                            Ready to Experience These Features?
                        </h2>
                        <p className="text-xl text-gray-400 mb-8">
                            Start using CodeSherpa today and transform your development workflow
                        </p>
                        <button
                            onClick={() => navigate('/chat')}
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
                        >
                            Try It Now
                        </button>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default FeaturesPage
