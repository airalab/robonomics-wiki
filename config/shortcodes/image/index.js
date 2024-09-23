const { optimize } = require('svgo');
const fs = require('fs');

const svgShortcode = (svgName, ariaName = '', className = '', styleName = '') => {
  const svgData = fs.readFileSync(`./src/assets/images/${svgName}.svg`, 'utf8');

  const {data} = optimize(svgData, {
    plugins: [
      "minifyStyles"
    ]
  });;

  return data.replace(
    /<svg(.*?)>/,
    `<svg$1 ${ariaName ? `aria-label="${ariaName}"` : 'aria-hidden="true"'} ${className ? `class="${className}"` : ''} ${styleName ? `style="${styleName}"` : ''} >`
  );
};


module.exports = {
	svgShortcode
};
