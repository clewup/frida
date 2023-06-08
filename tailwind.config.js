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
        'screen-header': '90vh'
      },
      minHeight: {
        'screen-header': '90vh'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        store: {
          primary: '#BFFF00',
          secondary: '#ff3478',
          accent: '#BFFF00',
          neutral: '#FFFFFF',
          'base-100': '#111111',
          info: '#3ABFF8',
          success: '#198754',
          warning: '#FBBD23',
          error: '#d9534f'
        }
      }
    ]
  }
}
