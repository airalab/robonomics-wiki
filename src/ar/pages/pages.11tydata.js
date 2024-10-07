export default  {
  eleventyComputed: {
    title: function (data) { 
      if(data.title) {
        return this.t(data.title, {}, 'ar');
      }
    },
    description: function (data) { 
      if(data.description) {
        return this.t(data.description, {}, 'ar');
      }
    },
  }
};