/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'svelte-brand': '#e44c1c',
				'dark-mode-black': '#121212',
				'light-gray': '#ECEDF3',
				'dark-mode-gray': '#212121',
				'dark-text-gray': '#313654'
			}
		}
	},
	plugins: []
};
