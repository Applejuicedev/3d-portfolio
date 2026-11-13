/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/*.{js,jsx}', './src/{sections,ui,lib,lab-exp,data}/**/*.{js,jsx}'],
  // iOS keeps :hover after a tap — only apply hover: variants on devices with a real pointer
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
      },
      // the tokens from index.css (same values), so utilities like text-muted or border-line exist
      colors: {
        bg: 'rgb(11 11 10 / <alpha-value>)',
        raised: 'rgb(20 20 19 / <alpha-value>)',
        well: 'rgb(16 16 15 / <alpha-value>)',
        line: 'rgb(255 255 255 / 0.09)',
        ink: 'rgb(238 237 232 / <alpha-value>)',
        muted: 'rgb(141 140 134 / <alpha-value>)',
        faint: 'rgb(84 83 78 / <alpha-value>)',
        lime: 'rgb(212 255 58 / <alpha-value>)',
      },
      transitionTimingFunction: { sys: 'cubic-bezier(0.2, 0.7, 0, 1)' },
    },
  },
  plugins: [],
}
