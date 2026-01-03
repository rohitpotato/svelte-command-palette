import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const file = url.searchParams.get('file');
	const allFiles = import.meta.glob('./*.html', { query: '?raw', import: 'default' });

	const fileToGet = Object.keys(allFiles).find((name) => {
		const fileName = name.split('/').pop();
		return fileName === file;
	});

	if (fileToGet && allFiles[fileToGet]) {
		const html = await allFiles[fileToGet]();
		return json({ html });
	}

	return json({ html: '' });
};

