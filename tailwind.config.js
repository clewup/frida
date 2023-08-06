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
  plugins: [],
  theme: {
    extend: {
      colors: {
        theme: {
          white: '#fbfbfb',
          gray: '#efefef',
          black: '#1c211f',
          mint: '#ddece0',
        },
      },
      fontFamily: {
        sans: ['Mabry', ...defaultTheme.fontFamily.sans],
        druk: ['Druk']
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
