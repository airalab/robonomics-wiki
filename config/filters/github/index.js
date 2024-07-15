const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({});

let ghUpdateDate = null;
let ghUpdateName = null;
let ghUpdateUrl = null;
let ghIssueTitle = null;
let ghLink = null;


const currentDoc = (path) => {
	let doc = path.slice(0, path.length - 1)
	if((doc.match(new RegExp("/", "g")) || []).length == 1) doc += '/getting-started'
	return doc+'.md';
};

const github_lastupdated = (currDoc) =>  {
	if (!octokit) {
		return
	}
	octokit.repos
		.listCommits({
			owner: "airalab",
			repo: "robonomics-wiki",
			path: currDoc
		})
		.then(({ data }) => {

			let d = new Date(data[0].commit.author.date)
			ghUpdateDate = d.toLocaleDateString()

			ghUpdateName = data[0].commit.author.name

			ghUpdateUrl = data[0].html_url

			return {
				ghUpdateDate,
				ghUpdateName,
				ghUpdateUrl
			}
		});
};

const github_link = (currDoc) => {
	if (!octokit) {
		return
	}
	octokit.repos
		.getContent({
			owner: "airalab",
			repo: "robonomics-wiki",
			path: currDoc
		})
		.then(result => {
			ghLink = result.data.html_url
			console.log(ghLink)
			return ghLink
		}).catch(e =>{
			console.error(e.message, ' -> error message')
		})


};

const getTitleForIssue = (title) => {
	if(title) {
		const url = new URL('https://github.com/airalab/robonomics-wiki/issues/new?assignees=&labels=documentation&template=doc-issue.md&');
		const params = new URLSearchParams(url.search);
		params.append('title', `issue for document page - ${title}`);
		ghIssueTitle = params.toString()
	}
	return ghIssueTitle
};


module.exports = {
	currentDoc,
	github_lastupdated,
	github_link,
	getTitleForIssue
}
