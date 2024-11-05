export default  {
  eleventyComputed: {
    title: function (data) { 
      if(data.title) {
        try {
          return this.t(data.title, {}, 'el');
        } catch(e) {
          // console.log(e)
        }
      }
    },
    description: function (data) { 
      if(data.description) {
        try {
          return this.t(data.description, {}, 'el');
        } catch(e) {
          // console.log(e)
        }
      }
    },
  }
};