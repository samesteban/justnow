/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway_400Regular"],
        "raleway-bold": ["Raleway_700Bold"],
        "raleway-black": ["Raleway_900Black"],
        "raleway-medium": ["Raleway_500Medium"],
        "raleway-semibold": ["Raleway_600SemiBold"],
      },
    },
  },
  plugins: [],
};
