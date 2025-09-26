import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Complete Luxe Noir color system with CSS variables
        black: 'var(--color-black)',
        white: 'var(--color-white)',
        gold: {
          DEFAULT: 'var(--color-gold)',
          light: 'var(--color-gold-light)',
          dark: 'var(--color-gold-dark)',
          90: 'var(--color-gold-90)',
        },
        gray: {
          DEFAULT: 'var(--color-gray)',
          light: 'var(--color-gray-light)',
          dark: 'var(--color-gray-dark)',
        },
        error: 'var(--color-error)',
        success: 'var(--color-success)',
        // Legacy color names for backwards compatibility
        'princess-black': 'var(--color-black)',
        'princess-gold': 'var(--color-gold)',
        'luxe-noir': {
          DEFAULT: 'var(--color-black)',
          90: 'var(--color-black-90)',
        },
        'royal-gold': {
          DEFAULT: 'var(--color-gold)',
          light: 'var(--color-gold-light)',
          dark: 'var(--color-gold-dark)',
        },
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      screens: {
        xs: '375px', // Small phones
        sm: '640px', // Large phones
        md: '768px', // Tablets
        lg: '1024px', // Desktop
        xl: '1280px', // Large desktop
        '2xl': '1536px', // Luxury displays
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        // 8px grid system
        '0': '0px',
        '1': '0.5rem', // 8px
        '2': '1rem', // 16px
        '3': '1.5rem', // 24px
        '4': '2rem', // 32px
        '6': '3rem', // 48px
        '8': '4rem', // 64px
        '12': '6rem', // 96px
        '16': '8rem', // 128px
        '20': '10rem', // 160px
        '24': '12rem', // 192px
        '32': '16rem', // 256px
        '40': '20rem', // 320px
        '48': '24rem', // 384px
        '56': '28rem', // 448px
        '64': '32rem', // 512px
      },
      maxWidth: {
        container: '1200px', // Max content width
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
      },
      margin: {
        mobile: '1rem', // 16px mobile margins
        desktop: '3rem', // 48px desktop margins
      },
      padding: {
        card: '1.5rem', // 24px card spacing
        mobile: '1rem', // 16px mobile padding
        desktop: '3rem', // 48px desktop padding
      },
    },
  },
  plugins: [],
};

export default config;
