/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")],

  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#9333ea",    
          "secondary": "#fb7185",    
          "accent": "#4d7c0f",    
          "neutral": "#000000",    
          "base-100": "#d1d5db",     
          "info": "#6366f1",             
          "success": "#84cc16",
          "warning": "#fcd34d",    
          "error": "#ef4444"
          },
      },
      "cyberpunk", "dark", "halloween", "synthwave",
      {
        lofi:{
          ...require("daisyui/src/colors/themes")["[data-theme=lofi]"],
          accent: "grey"
        }},
        {
          black:{
          ...require("daisyui/src/colors/themes")["[data-theme=black]"],
          accent: "grey"
          }}
    ]
  }
}

