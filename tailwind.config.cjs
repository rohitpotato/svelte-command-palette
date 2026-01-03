/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'svelte': '#ff3e00',
				'svelte-hover': '#ff5722',
				'bg-primary': 'var(--color-bg-primary)',
				'bg-secondary': 'var(--color-bg-secondary)',
				'bg-tertiary': 'var(--color-bg-tertiary)',
				'bg-elevated': 'var(--color-bg-elevated)',
				'bg-hover': 'var(--color-bg-hover)',
				'text-primary': 'var(--color-text-primary)',
				'text-secondary': 'var(--color-text-secondary)',
				'text-tertiary': 'var(--color-text-tertiary)',
				'border': 'var(--color-border)',
			},
			fontFamily: {
				sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
			},
			animation: {
				'fade-in': 'fade-in 0.25s ease-out',
				'slide-up': 'slide-up 0.4s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(255, 62, 0, 0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(255, 62, 0, 0.5)' },
				},
			},
		}
	},
	plugins: []
};
