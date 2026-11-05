---
title: Contributing
contributors: [positivecrash, ensrationis]
---

Robonomics is an open-source project, and we want to make it easy for anyone to contribute. You can report a problem, suggest a change, improve the code or this documentation. Open an issue or a pull request in the repository the change belongs to.

## Main repositories

- [airalab/robonomics](https://github.com/airalab/robonomics): the runtime and its pallets. It has its own CONTRIBUTING.md and SECURITY.md.
- [airalab/robins](https://github.com/airalab/robins): tools, including the `cps` command-line tool and device gateways.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): the Python library.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): the web app at [robonomics.app](https://robonomics.app).
- [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki): this wiki.
- [airalab/robonomics.network](https://github.com/airalab/robonomics.network): the main website.
- [airalab/robonomics.academy](https://github.com/airalab/robonomics.academy): the Robonomics Academy website.

## Reporting issues

1. Choose the repository the issue belongs to.
2. If it is a bug, check that it has not been reported already.
3. Give a clear title and description, with as much relevant information as you can.
4. For this wiki, use the issue template and name the page that needs fixing.

Do not report security vulnerabilities in public issues. Follow SECURITY.md in [airalab/robonomics](https://github.com/airalab/robonomics): it uses private reporting through GitHub Security Advisories.

## Proposing changes to the network

Changes to the runtime and its parameters are decided by XRT holders. Describe the idea in an issue on [airalab/robonomics](https://github.com/airalab/robonomics/issues) first, then take it to a referendum. See [XRT and governance](/docs/xrt-and-governance/#how-to-propose-a-change).

## Pull requests

1. For small fixes such as typos, a pull request is better than an issue.
2. Describe the problem and the solution in the pull request. Link the related issue if there is one.
3. Do not send pull requests that only fix whitespace or formatting.
4. Follow the style, language and layout of the surrounding text.

## Editing this wiki

The wiki is built with Eleventy. You need Node.js 20, or 22 and newer.

1. Clone [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki), then run `npm install` and `npm run start` to serve it locally.
2. Pages are Markdown files in `src/docs/`. Each starts with frontmatter: `title`, `contributors` (GitHub user names) and, optionally, `tools`.
3. The sidebar is `src/_data/sidebar_docs.json`. When you add an entry, add its title to `translations/pages/en.json` too.

The [README](https://github.com/airalab/robonomics-wiki#readme) explains the page components and the translation workflow.
