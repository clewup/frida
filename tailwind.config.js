// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  daisyui: {
    themes: [
      {
        store: {
          accent: '#BFFF00',
          'base-100': '#FFFFFF',
          error: '#d9534f',
          info: '#3ABFF8',
          neutral: '#FFFFFF',
          primary: '#BFFF00',
          secondary: '#ff3478',
          success: '#198754',
          warning: '#FBBD23'
        }
      }
    ]
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
  theme: {
    extend: {
      colors: {
        accent: '#BFFF00',
        'base-100': '#FFFFFF',
        error: '#d9534f',
        info: '#3ABFF8',
        neutral: '#FFFFFF',
        'neutral-black': '#1c211f',
        'neutral-mint': '#ddece0',
        primary: '#BFFF00',
        secondary: '#ff3478',
        success: '#198754',
        warning: '#FBBD23'
      },
      fontFamily: {
        sans: ['Mabry', ...defaultTheme.fontFamily.sans]
      },
      height: {
        'screen-header': '90vh'
      },
      minHeight: {
        'screen-header': '90vh'
      }
    }
  }
}
