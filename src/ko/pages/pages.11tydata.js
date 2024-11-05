export default  {
  eleventyComputed: {
    title: function (data) { 
      if(data.title) {
        try {
          return this.t(data.title, {}, 'ko');
        } catch(e) {
          // console.log(e)
        }
      }
    },
    description: function (data) { 
      if(data.description) {
        try {
          return this.t(data.description, {}, 'ko');
        } catch(e) {
          // console.log(e)
        }
      }
    },
  }
};