import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-light": "var(--primary-light)",
        "primary-dark": "var(--primary-dark)",
        "primary-foreground": "var(--primary-foreground)",
        accent: "var(--accent)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        ring: "var(--ring)",
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
      },
      backgroundImage: {
        'dot-pattern': 'radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.05) 1px, transparent 0)',
      },
      backgroundSize: {
        'dot-pattern': '24px 24px',
      },
    },
  },
  plugins: [],
} satisfies Config;
