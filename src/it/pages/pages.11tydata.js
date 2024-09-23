module.exports = {
  eleventyComputed: {
    title: function (data) { 
      if(data.title) {
        return this.t(data.title, {}, 'it');
      }
    },
    description: function (data) { 
      if(data.description) {
        return this.t(data.description, {}, 'it');
      }
    },
  }
};