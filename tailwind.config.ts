import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        pinky: '#ff4fa3',
        cyanx: '#2fdfff',
        purplex: '#7b5cff',
        cream: '#fff8f3',
        navy: '#1b1533'
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
        display: ['var(--font-fredoka)', 'sans-serif'],
        fredoka: ['var(--font-fredoka)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 80px rgba(123,92,255,.12)'
      }
    }
  },
  plugins: []
};
export default config;
