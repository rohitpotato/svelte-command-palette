import fs from 'fs/promises';
import path from 'path';
import shiki from 'shiki';

export const generateSnippets = async () => {
	const __dirname = path.dirname('');
	const files = await fs.readdir(path.join(__dirname, './snippets'));
	const highlighter = await shiki.getHighlighter({ theme: 'github-dark-dimmed' });
	// for each file, convert to html
	const generatedMarkup = files.map(async (file) => {
		const content = await fs.readFile(path.join(__dirname, `./snippets/${file}`), 'utf-8');
		const html = highlighter.codeToHtml(content, { lang: 'svelte' });
		return {
			html,
			fileName: file
		};
	});
	const generatedHTML = await Promise.all(generatedMarkup);
	// write each geneated to code/*.html
	const writeFiles = generatedHTML.map(async ({ fileName, html }) => {
		fileName = fileName.replace('.txt', '');
		try {
			await fs.unlink(path.join(__dirname, `./src/routes/code/${fileName}.html`));
		} catch (e) {
			//
		}
		return fs.writeFile(path.join(__dirname, `./src/routes/code/${fileName}.html`), html, {
			encoding: 'utf8',
			flag: 'w'
		});
	});
	await Promise.all(writeFiles);
	return generatedHTML;
};

generateSnippets();
