let ghIssueTitle = null;

export const getTitleForIssue = (title) => {
	if(title) {
		const url = new URL('https://github.com/airalab/robonomics-wiki/issues/new?assignees=&labels=documentation&template=doc-issue.md&');
		const params = new URLSearchParams(url.search);
		params.append('title', `issue for document page - ${title}`);
		ghIssueTitle = params.toString()
	}
	return ghIssueTitle
};

export const getCommit = (arr, title) => {
	return arr.filter(doc => {
		if(doc.name === title)
			return doc
	})
}

