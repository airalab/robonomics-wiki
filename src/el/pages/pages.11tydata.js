export default  {
  eleventyComputed: {
    title: function (data) { 
      if(data.title) {
        return this.t(data.title, {}, 'el');
      }
    },
    description: function (data) { 
      if(data.description) {
        return this.t(data.description, {}, 'el');
      }
    },
  }
};