var nunjucks  = require('nunjucks');
var env = nunjucks.configure();

const overlay = document.querySelector('.overlay');

const stopScroll = () => {
  document.body.classList.add("disable-scroll");
};

const getScroll = () => {
  document.body.classList.remove("disable-scroll");
};


