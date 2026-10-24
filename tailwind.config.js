/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  // iOS keeps :hover after a tap — only apply hover: variants on devices with a real pointer
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Cascadia Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      // the design tokens from index.css (same values), so utilities like text-muted or border-line exist
      colors: {
        bg: 'rgb(15 15 14 / <alpha-value>)',
        raised: 'rgb(22 22 21 / <alpha-value>)',
        line: 'rgb(255 255 255 / 0.08)',
        ink: 'rgb(236 235 230 / <alpha-value>)',
        muted: 'rgb(139 138 133 / <alpha-value>)',
        faint: 'rgb(86 85 79 / <alpha-value>)',
        signal: 'rgb(255 91 31 / <alpha-value>)',
      },
      transitionTimingFunction: { sys: 'cubic-bezier(0.2, 0.7, 0, 1)' },
    },
  },
  plugins: [],
}
