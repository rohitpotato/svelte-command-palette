import themeStore from '../store/themeStore';

const switchTheme = () => {
	const root = document.documentElement;
	const currentTheme = root.classList.contains('dark') ? 'dark' : 'light';
	const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

	root.classList.remove('dark', 'light');
	root.classList.add(newTheme);

	localStorage.setItem('theme', newTheme);
	themeStore.set(newTheme);
};

export default switchTheme;
