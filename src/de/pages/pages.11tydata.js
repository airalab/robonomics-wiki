export default  {
  eleventyComputed: {
    title: function (data) { 
      if(data.title) {
        try {
          return this.t(data.title, {}, 'de');
        } catch(e) {
          // console.log(e)
        }
      }
    },
    description: function (data) { 
      if(data.description) {
        try {
          return this.t(data.description, {}, 'de');
        } catch(e) {
          // console.log(e)
        }
      }
    },
  }
};