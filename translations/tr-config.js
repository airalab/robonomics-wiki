import dotenv from "dotenv";
dotenv.config();

export const config = {
  key: process.env.OPENAI_KEY, // your OPENAI key
  allFiles: ['**/*.+(html|njk)', './src/_data/sidebar_docs.json'], // array of files for translation (with the help of glob)
  excludeFiles: ['node_modules/**', 'dist/**', './src/_includes/ogImage.og.njk', './src/_includes/header.njk'], // files to exclude from ai translation
  defaultLocale: 'en',
  locales: ["ar","de","el","es","fr","it","ja","ko","pt","ru","uk","zh"], // array with all locales
  outputFolder: './translations/pages/', // endpoint translations folder
  includeJSON: 'sidebar_docs.json', // json file that you want to translate, needs to be included in all files (for custom translation)
  JSONKey: 'title' // key to find values for translation in json file
}

export const configMD = {
  key: process.env.OPENAI_KEY, // your OPENAI key
  inputFolder: './src/docs/', // folder with markdown files
  inputFolderName: 'docs',
  outputFolder: './src/', // endpoint translations folder
  defaultLocale: 'en',
  locales: ["ar","de","el","es","fr","it","ja","ko","pt","ru","uk","zh"], // array with all locales
}