/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gray: {
                    950: '#030712',
                    900: '#0f172a',
                    800: '#1e293b',
                    700: '#334155',
                },
            },
            backgroundColor: {
                'gradient-blue': 'linear-gradient(135deg, #3b82f6, #1e40af)',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
    darkMode: 'class',
}

