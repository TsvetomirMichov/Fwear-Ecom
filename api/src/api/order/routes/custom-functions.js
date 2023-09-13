
module.exports = {
    routes: [
      { // Path defined with a regular expression
        method: 'POST',
        path: '/custom', // Only match when the URL parameter is composed of lowercase letters
        handler: 'order.custom',
        config:{
            auth:false
        }
      }
    ]
  }