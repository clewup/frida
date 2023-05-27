/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        store: {
          primary: '#1FB2A5',
          secondary: '#037d50',
          accent: '#1FB2A5',
          neutral: '#CCCCCC',
          'base-100': '#3e3e42',
          info: '#3ABFF8',
          success: '#198754',
          warning: '#FBBD23',
          error: '#d9534f'
        }
      }
    ]
  }
}
