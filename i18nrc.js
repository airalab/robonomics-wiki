const { join } = require('path')
require('dotenv').config();

// translation command - npx i18n t

module.exports = {
  funcName: 't',
  entry: join(__dirname, './src/'), // for vue files
  // entry: join(__dirname, './docs/'), // for markdown files
  fileRegExp: /\.vue$/, // for vue files
  // fileRegExp: /\.md$/, // for markdown files
  output: {
    path: join(__dirname, './translations/'), // for vue
    // path: join(__dirname, './translations/docs/'), // for md
  },
  translator: 'openai',
  openaiConfig: {
    key: process.env.GRIDSOME_OPENAI_KEY,
    from: 'English',
    to: ["Chinese", "Korean", "Japanese", "Russian", "Arabic", "Spanish", "German", "Portuguese", "Greek", "Italian", "French", "Ukrainian"]
  }
}


