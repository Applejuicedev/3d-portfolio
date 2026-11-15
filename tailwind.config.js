/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/*.{js,jsx}', './src/{site,body,cv,sections,ui,lib,data}/**/*.{js,jsx}'],
  // iOS keeps :hover after a tap — only apply hover: variants on devices with a real pointer
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      fontFamily: {
        // SF Pro on Apple devices (as on adamperlis.com), Inter elsewhere
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', '"SF Mono"', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      // the tokens from index.css — CSS variables, so the palettes (html[data-theme]) change them all
      colors: {
        canvas: 'rgb(var(--c-canvas) / <alpha-value>)',
        paper: 'rgb(var(--c-paper) / <alpha-value>)',
        mist: 'rgb(var(--c-mist) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        gray: 'rgb(var(--c-gray) / <alpha-value>)',
        faint: 'rgb(var(--c-faint) / <alpha-value>)',
        line: 'rgb(var(--c-line) / 0.08)',
        night: 'rgb(28 28 30 / <alpha-value>)',
        blue: 'rgb(var(--c-accent) / <alpha-value>)', // the accent: blue, orange, light blue or yellow by palette
        'on-accent': 'rgb(var(--c-on-accent) / <alpha-value>)',
      },
      // one radius scale: control · card · window · sheet
      borderRadius: { ctl: '10px', card: '16px', win: '22px', sheet: '32px' },
      boxShadow: {
        win: '0 1px 1px rgb(0 0 0 / .04), 0 8px 24px -6px rgb(0 0 0 / .10), 0 30px 70px -20px rgb(0 0 0 / .18)',
        lift: '0 1px 1px rgb(0 0 0 / .05), 0 18px 50px -12px rgb(0 0 0 / .22), 0 50px 110px -30px rgb(0 0 0 / .25)',
        pill: '0 1px 2px rgb(0 0 0 / .06), 0 6px 20px -6px rgb(0 0 0 / .12)',
      },
      transitionTimingFunction: { sys: 'cubic-bezier(0.32, 0.72, 0, 1)' },
    },
  },
  plugins: [],
}
