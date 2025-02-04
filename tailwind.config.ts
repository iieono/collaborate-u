import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        "bg-light": "#FAF7F0", // Soft light background
        "bg-secondary": "#D8D2C2", // Light beige background
        "bg-dark": "#4A4947", // Dark background (gray)

        // Text colors
        "text-primary": "#4ADE80", // Accent green for text (primary)
        "text-secondary": "#B17457", // Warm brown for secondary text
        "text-light": "#D8D2C2", // Light beige text
        "text-dark": "#333030", // Dark gray text for headings or emphasis

        // Light & Dark Variants
        "primary-light": "#F1EDE4", // Light variation of the primary color
        "primary-dark": "#333030", // Darker variation for depth (can be used for borders or text)

        "secondary-light": "#D38E71", // Lighter variant of brown for accents
        "secondary-dark": "#8A5A40", // Darker variant of brown for depth

        // Accent Colors
        "accent-green": "#4ADE80", // Vibrant green for highlights and buttons
        "accent-orange": "#E99A67", // Soft orange for warmth and accents
      },
    },
  },
  plugins: [],
} satisfies Config;
