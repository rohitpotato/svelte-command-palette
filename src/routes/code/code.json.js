export async function get({ url }) {
	const file = url.searchParams.get('file');
	const allFiles = import.meta.glob('./*.html', { as: 'raw' });
	const fileToGet = Object.keys(allFiles).find((name) => {
		const fileName = name.split('/').pop();
		return fileName === file;
	});
	return {
		body: {
			html: allFiles[fileToGet]
		},
		headers: {
			'Content-type': 'application/json'
		}
	};
}
