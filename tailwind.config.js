/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#1E3A8A',
        'emerald-green': '#10B981',
        'soft-violet': '#8B5CF6',
        'light-gray': '#F3F4F6',
        'off-white': '#FEFCE8',
        'accent-gold': '#F59E0B',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(to right, #1E3A8A, #8B5CF6)',
      },
    },
  },
  plugins: [],
};