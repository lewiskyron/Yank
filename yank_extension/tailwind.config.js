/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		// Container settings for centering content and setting padding
		container: {
			center: true,
			padding: "1rem", // Adds 1rem padding around the container
		},
		extend: {
			// Custom colors for your project
			colors: {
				primary: "#1D4ED8", // Blue for primary elements like buttons
				secondary: "#64748B", // Muted grey for secondary elements
				background: "#FCFAEE", // Light grey for background
				foreground: "#1F2937", // Dark color for text
				border: "#E5E7EB", // Light border color
			},
			// Custom font family
			fontFamily: {
				sans: ["Inter", "sans-serif"], // Default sans-serif font
			},
			// Custom border radius for rounded elements
			borderRadius: {
				DEFAULT: "0.5rem", // Default border radius (8px)
			},
		},
	},
	plugins: [], // You can add any additional Tailwind plugins here
};
