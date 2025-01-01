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
        img2:"url('/../src/assets/home/featured.jpg')",
        img3:"url('/../src/assets/others/authentication.png')"
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

