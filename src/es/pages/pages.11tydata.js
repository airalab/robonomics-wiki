export default  {
  eleventyComputed: {
    title: function (data) { 
      if(data.title) {
        return this.t(data.title, {}, 'es');
      }
    },
    description: function (data) { 
      if(data.description) {
        return this.t(data.description, {}, 'es');
      }
    },
  }
};