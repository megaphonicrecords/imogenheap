import type { Config } from 'tailwindcss'
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },  
      boxShadow: {
        'red': '0 4px 14px 0 rgba(255, 0, 0, 0.1)',
        'blue': '0 4px 14px 0 rgba(0, 0, 255, 0.1)',
        'green': '0 4px 14px 0 rgba(0, 255, 0, 0.1)',
        // Add more colors as needed
      },
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
    },
    animation: {
      fadeIn: 'fadeIn 0.5s ease-in-out',
    },
  },
  variants: {
    extend: {
      boxShadow: ['hover'],
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

export default config
