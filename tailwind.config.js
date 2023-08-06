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
        filter: {
          white: '#ffffff',
          black: '#000000',
          gray: '#808080',
          red: '#ef233c',
          blue: '#4cc9f0',
          green: '#06d6a0',
          yellow: '#f4d35e',
          orange: '#ffa500',
          purple: '#c77dff',
          pink: '#ff70a6',
          brown: '#a52a2a',
          na: '#808080'
        }
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
