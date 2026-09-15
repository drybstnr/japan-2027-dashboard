import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: { sage: '#7A9278', ink: '#242821', paper: '#F7F6F3' },
      fontFamily: { sans: ['var(--font-geist)'], display: ['var(--font-manrope)'] },
    },
  },
  plugins: [],
};
export default config;
