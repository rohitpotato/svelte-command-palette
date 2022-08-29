import themeStore from '../store/themeStore';
const LIGHT = 'light';
const DARK = 'dark';

const handleThemeSwitch = () => {
	const theme = localStorage.getItem('theme') || 'light';
	const root = window.document.documentElement;
	const isDark = theme === DARK;
	root.classList.remove(theme);
	root.classList.add(isDark ? LIGHT : DARK);
	localStorage.setItem('theme', isDark ? LIGHT : DARK);
	themeStore.set(isDark ? LIGHT : DARK);
};

export default handleThemeSwitch;
