import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  safelist: [
    // Toutes les tailles de texte en pixels personnalisées
    {
      pattern: /text-\[\d+px\]/, // ex : text-[150px], text-[600px], text-[180px], etc.
    },
    // Toutes les marges négatives en rem ou px
    {
      pattern: /-?mt-\[\d+rem\]/, // ex : -mt-[44rem], -mt-[28rem], etc.
    },
    {
      pattern: /-?mt-\d+/, // ex : -mt-40, mt-40, mt-60, etc.
    },
    {
      pattern: /-?mb-\d+/, // ex : mb-20, mb-60, mb-40
    },
    {
      pattern: /-?top-\d+/, // ex : -top-12, -top-16
    },
    // Largeurs personnalisées en %
    {
      pattern: /w-\[\d+%\]/, // ex : w-[48%], w-[59%], w-[65%]
    },
    {
      pattern: /w-\d+\/\d+/, // ex : w-1/3
    },
    {
      pattern: /w-\d+/, // ex : w-24
    },
    // Padding
    {
      pattern: /p[ltbrxy]?-?\d+/, // ex : p-10, px-48, px-32, pl-12, pt-60, etc.
    },
    // Leading (line-height)
    {
      pattern: /leading-\[\d+rem\]/, // ex : leading-[10rem], leading-[5rem]
    },
    // Espacement (gap)
    {
      pattern: /gap-\d+/, // ex : gap-6
    },
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
    '-z-10', // attention à la casse de `Z` → c'est `-z-10` en tailwind
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
        grey: "#D9D9D9"
      },
      fontFamily: {
        fontMenu: ['Menu', 'sans-serif'],
        fontRegular: ['Regular', 'sans-serif'],
        fontMedium: ['Medium', 'sans-serif'],
        fontBold: ['Bold', 'sans-serif'],
        fontBlack: ['Black', 'sans-serif'],
        number: ['Number', 'sans-serif'],
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
        },
        pulseLetter: {
          '0%': {
            transform: 'scale(1)',
          },
          '33%': {
            transform: 'scale(0.8)',
          },
          '77%': {
            transform: 'scale(1.2)',
            color: '#7DA365'
          },
          '100%': {
            transform: 'scale(1)',
          }
        },
        hoverLetter: {
          '0%': {
            transform: 'scale(0.8)'
          },
          '50%': {
            transform: 'scale(1.2)',
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
        hoverLetter: 'hoverLetter 0.3s ease-in-out both',
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
export default config
