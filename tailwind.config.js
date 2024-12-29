/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        img:"url('/../src/assets/home/chef-service.jpg')",
        img2:"url('/../src/assets/home/featured.jpg')"
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

