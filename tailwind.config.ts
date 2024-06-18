import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        'in-menu': 'cubic-bezier(0.92,0.19,0.94,0.72)',
      },
      colors: {
        primary: '#7DA365',
        secondary: '#161819',
        white: '#f0f0f0'
      },
      fontFamily: {
        fontMenu: ['Menu', 'sans-serif'],
        fontRegular: ['Regular', 'sans-serif'],
        fontBold: ['Bold', 'sans-serif'],
      },
      keyframes: {
        translateY100: {
          '0%': { 
            transform: 'translateY(100%)',
            opacity: "0"
           },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
           },
        },
        translateY10: {
          '0%': { 
            transform: 'translateY(10%)',
            opacity: "0"
           },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
           },
        }
      },
      animation: {
        translateY100: 'translateY100 0.9s ease-in-out both',
        translateY10: 'translateY10 0.9s ease-in-out both',
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
export default config
