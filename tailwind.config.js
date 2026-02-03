/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['var(--font-display)', 'serif'],
        'heading': ['var(--font-heading)', 'serif'],
        'body': ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        'void': {
          'deep': 'var(--void-deep)',
          'medium': 'var(--void-medium)',
          'light': 'var(--void-light)',
        },
        'indigo': {
          'dark': 'var(--indigo-dark)',
          'medium': 'var(--indigo-medium)',
        },
        'amber': {
          'glow': 'var(--amber-glow)',
          'bright': 'var(--amber-bright)',
          'dim': 'var(--amber-dim)',
        },
        'violet': {
          'glow': 'var(--violet-glow)',
          'bright': 'var(--violet-bright)',
          'dim': 'var(--violet-dim)',
        },
        'arcane': {
          'teal': 'var(--arcane-teal)',
        },
        'text': {
          'primary': 'var(--text-primary)',
          'secondary': 'var(--text-secondary)',
          'dim': 'var(--text-dim)',
        },
        // Legacy spell colors for backward compatibility
        'spell': {
          'primary': '#6366f1',
          'secondary': '#8b5cf6',
          'accent': '#f59e0b',
          'dark': '#1e1b4b',
          'darker': '#0f0d2e',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #6366f1, 0 0 10px #6366f1' },
          '100%': { boxShadow: '0 0 20px #6366f1, 0 0 30px #8b5cf6' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        }
      },
      backgroundSize: {
        '200': '200% 100%',
      }
    },
  },
  plugins: [],
}
