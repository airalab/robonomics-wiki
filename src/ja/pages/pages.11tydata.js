export default  {
  eleventyComputed: {
    title: function (data) { 
      if(data.title) {
        return this.t(data.title, {}, 'ja');
      }
    },
    description: function (data) { 
      if(data.description) {
        return this.t(data.description, {}, 'ja');
      }
    },
  }
};