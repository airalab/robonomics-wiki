import fs from 'node:fs';
import language from './language.js';

// GitHub Pages ignores `_redirects`, so the moves listed there are also published as
// small HTML pages that forward the browser. A redirect page is made only when no page
// is built at that address: an old localized page that still exists wins, and its
// redirect appears once that page is deleted.
//
// Docs that exist in English but not yet in a language get a redirect page from
// /<lang>/docs/<slug>/ to the English page, so that the localized sidebar has no dead links.

const sourceExists = (url) => {
	const m = url.match(/^\/(?:([a-z]{2})\/)?docs\/([^/]+)\/$/);
	if (!m) return false;
	const dir = m[1] ? `./src/${m[1]}/docs` : './src/docs';
	return fs.existsSync(`${dir}/${m[2]}.md`);
};

export default function () {
	const result = new Map();

	fs.readFileSync('./_redirects', 'utf8').split('\n').forEach((line) => {
		const [from, to, status] = line.trim().split(/\s+/);
		if (!from || from.startsWith('#') || status !== '301' || sourceExists(from)) return;
		// a localized target that is not translated yet falls back to English
		const target = sourceExists(to) ? to : to.replace(/^\/[a-z]{2}\/docs\//, '/docs/');
		result.set(from, target);
	});

	const enSlugs = fs.readdirSync('./src/docs').filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3));
	language.allLocales.filter((l) => l !== 'en').forEach((lang) => {
		enSlugs.forEach((slug) => {
			const from = `/${lang}/docs/${slug}/`;
			if (!result.has(from) && !sourceExists(from)) result.set(from, `/docs/${slug}/`);
		});
	});

	return Array.from(result, ([from, to]) => ({ from, to }));
}
