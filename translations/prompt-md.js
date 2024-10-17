import dotenv from "dotenv";
import fs from "node:fs";
import axios from"axios";
import chalk from 'chalk';
import { encode, decode } from 'gpt-tokenizer';

// Load environment variables from .env file
dotenv.config();

import {configMD} from './tr-config.js';

const key = configMD.key;

// reference for ai translation
const defaultReference = 'You can adjust the tone and style, taking into account the cultural connotations and regional differences of certain words. As a translator, you need to translate the original text into a translation that meets the standards of accuracy and elegance.';

const url = 'https://api.openai.com/v1/chat/completions';
const defaultLocale = configMD.defaultLocale;
const locales = configMD.locales; // array with all locales
const inputFolder = configMD.inputFolder; // folder with default files
const outputFolder = configMD.outputFolder; // endpoint translations folder
const isInProgress = []; // to notify when all jobs are completed

const readMarkdown = (filePath) => {
  return fs.readFileSync(filePath, 'utf8');
};

const writeFile = (filePath, data) => {
  fs.writeFileSync(filePath, data, 'utf8');
}

const checkExistingFiles = (path) => {
  if (fs.existsSync(path)) {
    return true
  } else {
    return false
  }
}

const deleteFile = (path) => {
  locales.map(locale => {
    if(fs.existsSync(`${outputFolder}${locale}/${configMD.inputFolderName}/${path}`))
    fs.unlinkSync(`${outputFolder}${locale}/${configMD.inputFolderName}/${path}`)
  })

}

const countTokens = (str) => {
  return encode(str).length
}

const translationData = (from, to, input) => {
  return {
    model: "gpt-3.5-turbo", // gpt model
    messages: [
      { role: "system", content: [
        `Translate the markdown file from ${from} to ${to} according to the BCP 47 standard. DO NOT add markdown tags. Translate ONLY given prompt, do not add anything new`,
        `Here are some reference to help with better translation.  ---${defaultReference}---`,
        `Make sure the output remains a valid markdown file.`,
      ]
        .filter(Boolean)
        .join('\n'), },
      { role: "user", content: input },
    ],
    temperature: 0,
    max_tokens: 4000,
    top_p: 1,
  };
}

const translateMD = async(from, to, input, output, file, locale) => {

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${key}`,
  };

  const chunksOfDoc = [];

  // checking token count due to token limit (4096)
  // setting 1000 token because greek takes way more than other locales and outputs incorrect document
  if(countTokens(input) > 1000) {
    // if it's a big doc than we cut text in chunks for correct output in all locales (greek especially)
    const parts =  Math.ceil(countTokens(input) / 300);
    let sliceAmount = 0;

    for (let i = 0; i < parts; i++) {
      chunksOfDoc.push(decode(encode(input).slice(sliceAmount, sliceAmount + 300)))
      sliceAmount += 300;
    }
  }  


  try {
    console.log(chalk.yellow(`🤖 starting translation for ${file.substring(0, file.indexOf("."))}`), '-', chalk.magenta(locale) );
    let result = '';

    if(chunksOfDoc.length) {
      console.log(chalk.bgBlueBright('⏳ translation may take some time, please wait...⌛️'))
      const translatedChunks = [];

      for await (const chunk of chunksOfDoc) {
        const response = await axios.post(url, translationData(from, to, chunk), {headers});
        translatedChunks.push(response.data.choices[0].message.content)
      }

      console.log(chalk.green(`✅ translation completed -`), chalk.greenBright(`${locale}/${file.substring(0, file.indexOf("."))}`))
      writeFile(output, translatedChunks.join(''));
      isInProgress.pop();
      if(!isInProgress.length) {
        console.log(chalk.magentaBright('all done 💠'))
      }
    } else {
      const response = await axios.post(url, translationData(from, to, input), {headers});
      result = response.data.choices[0].message.content;
      console.log(chalk.green(`✅ translation completed -`), chalk.greenBright(`${locale}/${file.substring(0, file.indexOf("."))}`))
      writeFile(output, result)
      isInProgress.pop();
      if(!isInProgress.length) {
        console.log(chalk.magentaBright('all done 💠'))
      }
    }
  } catch (error) {
    console.error(
      chalk.red("❌ Error calling ChatGPT API:"),
      error.response ? error.response.data : error.message
    );
    throw error;
  }

}

// check if doc in default folder was removed and delete the doc from all the locales
const checkDeletedFile = () => {
  const defaultDir = fs.readdirSync(inputFolder).filter(f => f.includes('md'));
  const localeDir = fs.readdirSync(`${outputFolder}${locales[0]}/${configMD.inputFolderName}/`).filter(f => f.includes('md'))

  if (JSON.stringify(defaultDir) !== JSON.stringify(localeDir)) {
    const res = localeDir.filter(x => !defaultDir.includes(x));

    res.map(file => {
      deleteFile(file)
    })
  }
}

const set = async () => {
  console.log(chalk.yellow('🤖 getting markdown files from 🤖 ', inputFolder))
  for await (const locale of locales) {
    for await (const file of fs.readdirSync(inputFolder)) {
      if(file.includes('md')) {
        if(!checkExistingFiles(`${outputFolder}${locale}/${configMD.inputFolderName}/${file}`)) {
          isInProgress.push('+');
          await translateMD(defaultLocale, locale, readMarkdown(inputFolder + file), `${outputFolder}${locale}/${configMD.inputFolderName}/${file}`, file, locale)
        }
      }
    }
  }
  if(!isInProgress.length) {
    console.log(chalk.magentaBright('all done 💠'))
  }
}

checkDeletedFile();
set()
