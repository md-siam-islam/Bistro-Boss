/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['"Cinzel"', "serif"],
        sans: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          primary: "#D4AF37",
          accent: "#D99904",
          light: "#F3C651",
          deep: "#8C6A18",
        },
        dark: {
          950: "#070a10",
          900: "#0b0f19",
          850: "#0f1523",
          800: "#141c2e",
          700: "#1e293b",
          600: "#334155",
        }
      },
      backgroundImage: {
        img: "url('/src/assets/home/chef-service.jpg')",
        img2: "url('/src/assets/home/featured.jpg')",
        img3: "url('/src/assets/others/authentication.png')",
        'gold-gradient': "linear-gradient(135deg, #F3C651 0%, #D4AF37 50%, #996515 100%)",
        'dark-glass': "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 45px rgba(212, 175, 55, 0.4)',
        'premium': '0 20px 50px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

