/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#333333',
        primary: {
          DEFAULT: '#2F80ED',
          100: '#E0E0E0',
          200: '#828282',
          300: '#4F4F4F'
        },
        indicator: {
          orange: '#F8B76B',
          purple: '#8785FF',
          red: '#EB5757',
          yellow: '#F2C94C'
        },
        chats: {
          orange: '#FCEED3',
          'orange-accent': '#F8B76B',

          purple: '#EEDCFF',
          'purple-accent': '#9B51E0',

          green: '#D2F2EA',
          'green-accent': '#43B78D'
        },
        sticker: {
          100: '#E9F3FF',
          200: '#FDCFA4',
          300: '#F9E9C3',
          400: '#AFEBDB',
          500: '#CBF1C2',
          600: '#CFCEF9',
          700: '#F9E0FD'
        }
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif']
      }
    }
  },
  plugins: []
}
