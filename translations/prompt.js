import dotenv from "dotenv";
import fs from "node:fs";
import axios from"axios";
import chalk from 'chalk';
import { encode, decode } from 'gpt-tokenizer';
import { glob } from 'glob';

// Load environment variables from .env file
dotenv.config();

import {config} from './tr-config.js';

const key = config.key;

// reference for ai translation
const defaultReference = 'You can adjust the tone and style, taking into account the cultural connotations and regional differences of certain words. As a translator, you need to translate the original text into a translation that meets the standards of accuracy and elegance.';

const url = 'https://api.openai.com/v1/chat/completions';
const defaultLocale = config.defaultLocale;
const locales = config.locales; // array with all locales
const outputFolder = config.outputFolder; // endpoint translations folder
const differences = []; // array to check deleted lines
const isInProgress = []; // to notify when all jobs are complete

const readFile = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  return data;
};

const writeFile = (filePath, data, translation=false, locale=defaultLocale) => {
  const jsonStr = JSON.stringify(data, null, "\t").replace(/]|[[]/g, '');

  let path = filePath;
  if(!filePath) {
    if(locale !== defaultLocale) {
      path = `${outputFolder}${locale}/${locale}.json`
    } else {
      path = `${outputFolder}/${defaultLocale}.json`
    }
  }

  if(translation) {
    fs.writeFileSync(path, data, 'utf8');
  } else {
    fs.writeFileSync(path, jsonStr, 'utf8');
  }
};

const allFiles = async () => {
  const files = await glob(config.allFiles, { ignore: config.excludeFiles })
  return files
}

const checkExistingFiles = (path) => {
  if (fs.existsSync(path)) {
    return true
  } else {
    return false
  }
}

const translateNewLine = async (from, to, input, locale) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${key}`,
  };

  const data = {
    model: "gpt-3.5-turbo", // gpt model
    messages: [
      { role: "system", content: [
        `Translate this string from ${from} to ${to}`
      ]
        .filter(Boolean)
        .join('\n'), },
      { role: "user", content: input },
    ],
    temperature: 0,
    // max_tokens: 4000,
    top_p: 1,
  };

  try {
      console.log(chalk.yellow(`🤖 starting translation for a new line - ${input}`), '-', chalk.magenta(locale) );
      const response = await axios.post(url, data, {headers});
      const result = response.data.choices[0].message.content;
      console.log(chalk.green(`✅ translation completed -`), chalk.greenBright(`new line for ${locale} translated`))
     return result;
  } catch (error) {
    console.error(
      chalk.red(" ❌ Error calling ChatGPT API:"),
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

const checkDeletedLine = (path, arr) => {
  const mainObj = JSON.parse(readFile(path));
  const arrayOfObjects = Object.entries(JSON.parse(readFile(path))).map(entry => entry[1])
  const newArr = [] 
  arr.map(entry => {
    newArr.push(...Object.keys(entry))
  })


  arrayOfObjects.filter(x => {
    if(!newArr.includes(x.replace(/^["'](.+(?=["']$))["']$/, '$1'))) {
      differences.push(x.trim())
    }
  })


  if(differences.length > 0) {
    differences.map(i => {
      // removing deleted lines
      delete mainObj[i];
      writeFile(path, mainObj)

      // removing deleted lines in all locales files
      locales.forEach(l => {
        const pathWithLocale = `${outputFolder}${l}/${l}.json`;
        if(checkExistingFiles(pathWithLocale)){
          const localeObj = JSON.parse(readFile(pathWithLocale))
          if(localeObj[i]) {
            delete localeObj[i];
            writeFile(pathWithLocale, localeObj)
          }
        }
      })
    })
  }

}

const updateFile = async (path, key, item) => {
  // checking existing key
  const exsObject = JSON.parse(readFile(path));
  if (!Object.keys(exsObject).includes(key.trim()))
    Object.assign(exsObject, {[key.trim()]: key.trim()})
    // updating file
    writeFile(path, exsObject)


    // updating all locale files
    for await (const l of locales) {
      const pathWithLocale = `${outputFolder}${l}/${l}.json`;
      if (checkExistingFiles(pathWithLocale)) {
        if(!Object.keys(JSON.parse(readFile(pathWithLocale))).includes(key.trim())) {
          const newKey = await translateNewLine(defaultLocale, l, key.trim(), l);
          const localeObj = JSON.parse(readFile(pathWithLocale))
          Object.assign(localeObj, {[key.trim()]: newKey})
          writeFile(pathWithLocale, localeObj)
        }
      }
    }

    isInProgress.pop();
}

const countTokens = (str) => {
  return encode(str).length
}

const translationData = (from, to, input) => {
  return {
    model: "gpt-3.5-turbo", // gpt model
    messages: [
      { role: "system", content: [
        `Translate the i18n JSON file from ${from} to ${to} according to the BCP 47 standard. Never translate the keys and leave them in English`,
        `Here are some reference to help with better translation.  ---${defaultReference}---`,
        `Keep the keys the same as the original file and make sure the output remains a valid i18n JSON file.`
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

const translateFile = async(from, to, input, output, file, locale) => {

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${key}`,
  };

  const chunksOfFile = [];

  // checking token count due to token limit (4096)
  // setting 1000 token because greek takes way more than other locales and outputs incorrect file
  if(countTokens(input) > 1200) {
    // if it's a big file than we cut text in chunks for correct output in all locales (greek especially)
    const parts =  Math.ceil(countTokens(input) / 1200);
    let sliceAmount = 0;

    for (let i = 0; i < parts; i++) {
      chunksOfFile.push(decode(encode(input).slice(sliceAmount, sliceAmount + 1200)))
      sliceAmount += 1200;
    }
  }  

  try {
    console.log(chalk.yellow(`🤖 starting translation for ${file.substring(0, file.indexOf("."))}`), '-', chalk.magenta(locale) );
    let result = '';

    if(chunksOfFile.length) {
      console.log(chalk.bgBlueBright('⏳ translation may take some time, please wait...⌛️'))
      const translatedChunks = [];

      for await (const chunk of chunksOfFile) {
        const response = await axios.post(url, translationData(from, to, chunk), {headers});
        translatedChunks.push(JSON.parse(response.data.choices[0].message.content))
      }

      console.log(chalk.green(`✅ translation completed -`), chalk.greenBright(`${locale}/${file.substring(0, file.indexOf("."))}`))
      const obj = Object.assign({}, ...translatedChunks)
      writeFile('', JSON.stringify(obj, null, "\t"), true, locale);
      isInProgress.pop();
      if(!isInProgress.length) {
        console.log(chalk.magentaBright('all done 💠'))
      }
    } else {
      const response = await axios.post(url, translationData(from, to, input), {headers});
      result = response.data.choices[0].message.content;
      console.log(chalk.green(`✅ translation completed -`), chalk.greenBright(`${locale}/${file.substring(0, file.indexOf("."))}`))
      writeFile('', result, true, locale);
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

const translationsSet = async () => {
  console.log(chalk.yellow('🤖 getting json files 🤖'));
  for await (const locale of locales) {
    for await (const file of fs.readdirSync(outputFolder)) {
      if(file.includes('json')) {
        if(!checkExistingFiles(`${outputFolder}${locale}/${locale}.json`)) {
          isInProgress.push('+');
          await translateFile(defaultLocale, locale, readFile(outputFolder + file), `${outputFolder}${locale}/${locale}.json`, `${locale}.json`, locale)
        }
      }
    }
  }
}

const getJsonValues = (data, keyToFind) => {
  return Object.entries(data)
  .reduce((acc, [key, value]) => (key === keyToFind)
    ? acc.concat(value)
    : (typeof value === 'object')
    ? acc.concat(getJsonValues(value, keyToFind))
    : acc
  , [])
}

const set = async () => {
  const res = await allFiles();
  const data = [];
  // creating json files from all content (excluding markdown)
  res.forEach(item => {
    if(item && !item.includes(config.includeJSON)) {
      const dataArr = readFile(item).replace(/(<([^>]+)>)|\{(%.+?)\/(.+?%)\}|{%\/%}|/ig, '').trim().split(/\r\n|\n|\r|\t/);
      const frontmatter = [];
      // removing frontmatter from njk files
      dataArr.filter(function (el, index) {
        if (readFile(item).includes('---')) {
          if( el === '---') {
            frontmatter.push(index)
          }
        }
      })

      // get elements in translation functions
      const allArr = readFile(item).trim().split(/\r\n|\n|\r|\t/)
      allArr.map(allEl => {
        let m = '';
        const regex = /{\{[^}]*\}\}/gm;
        while ((m = regex.exec(allEl)) !== null) {
          if (m.index === regex.lastIndex) {
              regex.lastIndex++;
          }

          m.forEach((match) => {
            if(match.includes(' | t}}') || match.includes(' | t }}')) {
              const newVal = match.replace(/\b(')\b|['"`]/g, '$1').replace(/ +/, " ").replace( /[{}]/g, '' ).replace( /[|]/g, '' ).trim().slice(0,-1);
              data.push({[newVal.trim()]: newVal.trim()})
            }
          });
        }
      })


      dataArr.slice(frontmatter[frontmatter.length - 1] + 1).filter( function (el) {
        if(/\S/.test(el) && !(/\{([^}]+)\}/.exec(el))) {
          let readyEl = el.trim();
          data.push({[readyEl]: readyEl})
        }
      });
    }

    if(item.includes(config.includeJSON)) {
      const d = Object.entries(JSON.parse(readFile(item))).map(entry => entry[1]);
      const res = getJsonValues(d, config.JSONKey);
      res.map(item => {
        data.push({[item]: item})
      })
    }
  })


  if(!checkExistingFiles(`${outputFolder}${defaultLocale}.json`)) {
    writeFile(outputFolder + defaultLocale + '.json', Object.assign({},...data))
  } else {
    // deleting unused keys
    checkDeletedLine(outputFolder + defaultLocale + '.json', data);
    // checking if file was changed
    for await (const el of data) {
      isInProgress.push('+');
      await updateFile(`${outputFolder}${defaultLocale}.json`, Object.values(el)[0])
    }
  }

  console.log(chalk.greenBright(`✅ json files were created ✅ `))
  
  // setting translation for all locales
  await translationsSet();
  isInProgress.pop();
  if(isInProgress.length < 1) {
    console.log(chalk.magentaBright('all done 💠'))
  }
}

// start prompt
set()


