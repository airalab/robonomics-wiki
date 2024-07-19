module.exports = function () {
	return {
		token: process.env.GITHUB_TOKEN,
		hcaptcha: process.env.CAPTCHA_ID,
		gscript: process.env.GSCRIPT_ID
	};
};
