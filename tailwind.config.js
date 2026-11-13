/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/*.{js,jsx}', './src/{sections,ui,lib,data}/**/*.{js,jsx}'],
  // iOS keeps :hover after a tap — only apply hover: variants on devices with a real pointer
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Tight"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        // SF Mono where the system has it (Apple devices), JetBrains Mono elsewhere
        mono: ['ui-monospace', '"SF Mono"', 'SFMono-Regular', 'Menlo', '"JetBrains Mono"', 'monospace'],
      },
      // the tokens from index.css (same values)
      colors: {
        canvas: 'rgb(250 250 250 / <alpha-value>)',
        paper: 'rgb(255 255 255 / <alpha-value>)',
        mist: 'rgb(240 240 240 / <alpha-value>)',
        ink: 'rgb(15 15 15 / <alpha-value>)',
        gray: 'rgb(99 99 102 / <alpha-value>)',
        faint: 'rgb(142 142 147 / <alpha-value>)',
        line: 'rgb(0 0 0 / 0.08)',
        night: 'rgb(28 28 30 / <alpha-value>)',
        blue: 'rgb(0 113 227 / <alpha-value>)',
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
