const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Mabry', ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      height: {
        'screen-header': '85vh'
      },
      minHeight: {
        'screen-header': '85vh'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        store: {
          primary: '#bfff00',
          secondary: '#04945f',
          accent: '#000000',
          neutral: '#CCCCCC',
          'base-100': '#bfff00',
          info: '#3ABFF8',
          success: '#198754',
          warning: '#FBBD23',
          error: '#d9534f'
        }
      }
    ]
  }
}
