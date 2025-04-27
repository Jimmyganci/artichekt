import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  safelist: [
    // Position & alignment
    'justify-self-end',
    'self-end',
    'text-center',
    'right-52',
    // Couleur & effet
    'bg-grey',
    'grayscale',
    // Fonts
    'font-number',
    // Text utilities classiques
    'text-3',
    'text-4xl',
    'text-6xl',
    '-z-10'
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        'in-menu': 'cubic-bezier(0.44,0.03,0.7,-0.12)',
        'in-letter': 'cubic-bezier(0.01,0.51,0.3,1.46)'
      },
      colors: {
        primary: '#7DA365',
        secondary: '#161819',
        white: '#f0f0f0',
        grey: '#D9D9D9'
      },
      fontFamily: {
        fontMenu: ['Menu', 'sans-serif'],
        fontRegular: ['Regular', 'sans-serif'],
        fontMedium: ['Medium', 'sans-serif'],
        fontBold: ['Bold', 'sans-serif'],
        fontBlack: ['Black', 'sans-serif'],
        number: ['Number', 'sans-serif']
      },
      keyframes: {
        translateY100: {
          '0%': {
            transform: 'translateY(100%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        },
        translateY10: {
          '0%': {
            transform: 'translateY(10%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        },
        pulseLetter: {
          '0%': {
            transform: 'scale(1)'
          },
          '33%': {
            transform: 'scale(0.8)'
          },
          '77%': {
            transform: 'scale(1.2)',
            color: '#7DA365'
          },
          '100%': {
            transform: 'scale(1)'
          }
        },
        hoverLetter: {
          '0%': {
            transform: 'scale(0.8)'
          },
          '50%': {
            transform: 'scale(1.2)'
          },
          '100%': {
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        translateY100: 'translateY100 0.9s ease-in-out both',
        translateY10: 'translateY10 0.9s ease-in-out both',
        pulseLetter: 'pulseLetter 0.3s ease-in-out both',
        hoverLetter: 'hoverLetter 0.3s ease-in-out both'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
export default config
