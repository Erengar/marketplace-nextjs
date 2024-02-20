import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {},
    ripple: (theme: any) => ({
      colors: theme('colors'),
    })
  },
  plugins: [
    require('tailwindcss-ripple')()
  ],
}
export default config
