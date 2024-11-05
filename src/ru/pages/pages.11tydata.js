export default  {
  eleventyComputed: {
    title: function (data) { 
      if(data.title) {
        try {
          return this.t(data.title, {}, 'ru');
        } catch(e) {
          // console.log(e)
        }
      }
    },
    description: function (data) { 
      if(data.description) {
        try {
          return this.t(data.description, {}, 'ru');
        } catch(e) {
          // console.log(e)
        }
      }
    },
  }
};