import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
    Sparkles, ArrowRight, Code2, Brain, Zap, Shield, 
    Globe, MessageSquare, Github, CheckCircle2, Star,
    TrendingUp, Users, Award, Rocket
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FeatureCard from '../components/FeatureCard'
import StatsCounter from '../components/StatsCounter'
import TestimonialCard from '../components/TestimonialCard'
import TextRoll from '../components/TextRoll'

const HomePage = () => {
    const navigate = useNavigate()
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const features = [
        {
            icon: <Brain className="w-8 h-8" />,
            title: "Multi-Agent AI System",
            description: "Specialized AI agents for code review, learning, and documentation",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Code2 className="w-8 h-8" />,
            title: "Smart Code Review",
            description: "Automated PR reviews with security checks and best practices",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Multilingual Support",
            description: "Explain code in Hindi, English, or Hinglish for Indian developers",
            color: "from-orange-500 to-red-500"
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Real-Time Chat",
            description: "Instant responses via WebSocket for seamless interaction",
            color: "from-yellow-500 to-orange-500"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Security First",
            description: "OWASP Top 10 vulnerability detection and AWS optimization",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: <MessageSquare className="w-8 h-8" />,
            title: "WhatsApp Integration",
            description: "Code on the go with mobile-first WhatsApp support",
            color: "from-teal-500 to-cyan-500"
        }
    ]

    const stats = [
        { value: 10000, suffix: "+", label: "Lines of Code Reviewed", icon: <Code2 /> },
        { value: 500, suffix: "+", label: "Bugs Prevented", icon: <Shield /> },
        { value: 1000, suffix: "+", label: "Developers Helped", icon: <Users /> },
        { value: 99, suffix: "%", label: "Satisfaction Rate", icon: <Award /> }
    ]

    const testimonials = [
        {
            name: "Rahul Sharma",
            role: "Senior Developer at TCS",
            content: "CodeSherpa has transformed how we review code. The Hindi explanations help our junior developers learn faster!",
            avatar: "RS",
            rating: 5
        },
        {
            name: "Priya Patel",
            role: "Tech Lead at Infosys",
            content: "The multi-agent system is brilliant. It catches security issues we would have missed. A must-have tool!",
            avatar: "PP",
            rating: 5
        },
        {
            name: "Amit Kumar",
            role: "Freelance Developer",
            content: "WhatsApp integration is a game-changer. I can review code while commuting. Truly built for India!",
            avatar: "AK",
            rating: 5
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
            {/* Animated background gradient */}
            <div 
                className="fixed inset-0 opacity-30 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 50%)`
                }}
            />

            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
                {/* Floating orbs */}
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
                    animate={{
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
                    animate={{
                        y: [0, -30, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />

                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">Powered by AWS Bedrock & Claude 3.5 Sonnet</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-black mb-6 leading-tight"
                    >
                        <TextRoll center className="gradient-text-blue inline-block">
                            CodeSherpa
                        </TextRoll>
                        <br />
                        <span className="text-4xl md:text-6xl text-gray-300">
                            Your AI Pair Programmer
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
                    >
                        Multi-agent AI platform built for Indian developers. 
                        Review code, learn faster, and ship with confidence. 
                        <span className="text-2xl ml-2">🇮🇳</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <button
                            onClick={() => navigate('/chat')}
                            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2"
                        >
                            Start Coding Smarter
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                        <button
                            onClick={() => navigate('/features')}
                            className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                        >
                            Explore Features
                        </button>
                    </motion.div>

                    {/* Quick stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-16 flex flex-wrap justify-center gap-8 text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span className="text-gray-400">Free to Start</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span className="text-gray-400">No Credit Card</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span className="text-gray-400">Open Source</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <StatsCounter key={index} {...stat} delay={index * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-6xl font-black mb-6">
                            <TextRoll center className="gradient-text-blue inline-block">
                                Powerful Features
                            </TextRoll>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Everything you need to code faster, smarter, and with confidence
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} delay={index * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-6xl font-black mb-6">
                            <TextRoll center className="gradient-text-blue inline-block">
                                How It Works
                            </TextRoll>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Get started in three simple steps
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Connect Your Repo",
                                description: "Link your GitHub repository or paste code directly",
                                icon: <Github className="w-12 h-12" />
                            },
                            {
                                step: "02",
                                title: "AI Analyzes Code",
                                description: "Our multi-agent system reviews for bugs, security, and best practices",
                                icon: <Brain className="w-12 h-12" />
                            },
                            {
                                step: "03",
                                title: "Get Insights",
                                description: "Receive detailed feedback in your preferred language",
                                icon: <Rocket className="w-12 h-12" />
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative group"
                            >
                                <div className="glass-dark rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 h-full">
                                    <div className="text-6xl font-black text-white/10 mb-4">
                                        {item.step}
                                    </div>
                                    <div className="text-blue-400 mb-4">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-gray-400">{item.description}</p>
                                </div>
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-6xl font-black mb-6">
                            <TextRoll center className="gradient-text-blue inline-block">
                                Loved by Developers
                            </TextRoll>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            See what developers across India are saying
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard key={index} {...testimonial} delay={index * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-32 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="glass-dark rounded-3xl p-12 md:p-16 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black mb-6">
                                Ready to Code Smarter?
                            </h2>
                            <p className="text-xl text-gray-400 mb-8">
                                Join thousands of developers using CodeSherpa to ship better code faster
                            </p>
                            <button
                                onClick={() => navigate('/chat')}
                                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 inline-flex items-center gap-2"
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default HomePage
