import React from 'react'
import { Github, Twitter, Linkedin, Heart } from 'lucide-react'
import TextRoll from './TextRoll'

const Footer = () => {
    return (
        <footer className="relative border-t border-white/10 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-2">
                        <TextRoll className="text-2xl font-black gradient-text-blue inline-block mb-4">
                            CodeSherpa
                        </TextRoll>
                        <p className="text-gray-400 mb-4">
                            Your AI pair programmer built for Indian developers. 
                            Code smarter, ship faster, learn better.
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://github.com/Cyansiiii/AI-FOR-BHARAT"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-bold mb-4">Product</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-400 text-sm">
                        © 2026 CodeSherpa. All rights reserved.
                    </p>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                        Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in India 🇮🇳
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
