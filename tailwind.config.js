module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        custom: '0px 0px 25px 0px rgba(19, 11, 67, 0.15)',
        'glow-primary': '0 0 20px rgba(66, 184, 131, 0.3)',
        'glow-green': '0 0 15px rgba(34, 197, 94, 0.3)',
        'glow-purple': '0 0 15px rgba(168, 85, 247, 0.3)',
        'glow-blue': '0 0 15px rgba(43, 108, 238, 0.3)',
      },
      colors: {
        primary: '#42b883',
        'background-light': '#f8fafc',
        'background-dark': '#0a0f18',
        obsidian: '#111722',
        surface: '#1a2233',
        'surface-light': '#ffffff',
        'border-dark': 'rgba(255, 255, 255, 0.1)',
        'border-light': '#e2e8f0',
        glass: 'rgba(255, 255, 255, 0.03)',
        'neutral-800': '#2d2d2d',
        'neutral-900': '#1a1a1a',
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        'full': '9999px'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
